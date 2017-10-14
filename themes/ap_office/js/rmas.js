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