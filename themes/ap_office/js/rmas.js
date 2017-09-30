function diagnostico(folio_rma){

	$.ajax({
		type: 'POST',
    	data: {
            folio_rma: folio_rma,
        },
	    url: window.location.origin+'/yiiNsstore/index.php?r=rmasYii/consultarDiagnosticoRma',
	    dataType: "json",
	    encoding: "UTF-8",
	    cache: false,
	    success: function (data) {
			$("#tabla-diagnostico tbody tr").remove();
			$('#div_diagnostico').fadeIn(1500, function(){
				var table = document.getElementById("tabla-diagnostico").getElementsByTagName('tbody')[0];
	    		var row = table.insertRow(0);
			    var cell1 = row.insertCell(0);
			    var cell2 = row.insertCell(1);

			    cell1.innerHTML= data.resultado_text;
			    cell2.innerHTML= data.diagnostico;

			     $(this).fadeIn('slow', function() {
					$.scrollTo(this, 1000);
				});


			});
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	    }
	});
}

$(document).ready(function(){
	var clienteIdPrestashop= $('#id_cliente').attr('value');

	$.datepicker.regional['es'] = {
		 closeText: 'Cerrar',
		 prevText: '< Ant',
		 nextText: 'Sig >',
		 currentText: 'Hoy',
		 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		 weekHeader: 'Sm',
		 dateFormat: 'dd-mm-yy',
		 firstDay: 1,
		 isRTL: false,
		 showMonthAfterYear: false,
		 yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);


	//js grid - start
	var date_type = function(config) {
	    jsGrid.Field.call(this, config);
	};

    date_type.prototype = new jsGrid.Field({
        filterTemplate: function() {
	        var now = new Date();
	        this._fromPicker = $("<input placeholder='Desde'>").datepicker({ 
	        	defaultDate: now.setFullYear(now.getFullYear() - 1),
	        	dateFormat: 'dd-mm-yy' 
	        });

	        this._toPicker = $("<input placeholder='Hasta'>").datepicker({ 
	        	defaultDate: now.setFullYear(now.getFullYear() - 1),
	        	dateFormat: 'dd-mm-yy' 
	        });
	        return $("<div>").append(this._fromPicker).append(this._toPicker);
	    },

	    filterValue: function(item) {
	        return {
	            f: this._fromPicker.datepicker("getDate"),
	            to: this._toPicker.datepicker("getDate")
	        };
	    },

        itemTemplate: function(value) {
        	date= new Date(value);

        	month= (date.getMonth() + 1).toString();
        	month = month.length > 1 ? month : '0' + month;

        	day= date.getDate().toString();
        	day = day.length > 1 ? day : '0' + day;
            return day + '-' + month + '-' +  date.getFullYear();
        },
    });
 
    jsGrid.fields.date_type = date_type;


	var consulta_rma= window.location.origin + '/yiiNsstore/index.php?r=rmasYii/consultarRma';
	jsGrid.locale('es');

	var estados = [
        { Name: "", Id: '' },
        { Name: "Entregado", Id: 'E' },
        { Name: "Recibido", Id: 'R' },
        { Name: "Solucionado", Id: 'S' }
    ];

    $("#rmas_grid").jsGrid({
        height: "auto",
        width: "100%",
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        filtering: true,
 
        controller: {
        	loadData: function(filter) {
		        return $.ajax({
		            type 	: "POST",
		            dataType: "json",
		            url		: consulta_rma,
		            data 	: {
		            	datos: filter,
		            	cliente: clienteIdPrestashop
		            }
		        });
		    }
        },
 
        fields: [
            { name: "folio_rma", type: "text", title: "Folio RMA"},
            { name: "folio_pedido", type: "text", title: "Folio Pedido Piso"},
            { name: "folio_pedido_web", type: "text", title: "Folio Pedido Web"},
            { name: "id_producto", type: "text", title: "Referencia", width: 200},
            { name: "num_serie", type: "text", title: "N. Serie"},
            { name: "fecha_entrada", type: "date_type", title: "Fecha Entrada"},
            { name: "fecha_entrega", type: "date_type", title: "Fecha Entrega"},
            { name: "motivo_rma", type: "text", title: "Motivo"},
            { name: "status_rma", type: "select", items: estados, valueField: "Id", textField: "Name", title: "Estado", width: 150, itemTemplate: function(value, item) { 
            	if(value== 'S')
			    	estado = "<span class='label dark' style='background-color:#32CD32; border-color:#32CD32;'>Soluci&oacute;n</span> <a  id='"+item.folio_rma+"' class='btnDiagnostico btn btn-default button button-small' onclick=diagnostico("+item.folio_rma+")>Diagnóstico</a>";
				    
			    else if(value== 'E')
			    	estado = "<span class='label' style='background-color:#108510; border-color:#108510;'>Entregado</span> <a  id='"+item.folio_rma+"' class='btnDiagnostico btn btn-default button button-small' onclick=diagnostico("+item.folio_rma+")>Diagnóstico</a>";
				    
			   	else		        				    		        
			    	estado = "<span class='label' style='background-color:#4169E1; border-color:#4169E1;'>Recibido</span>";
            	return estado; 
            }},
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });
	//js grid - end
});