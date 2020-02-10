//Muestra el detalle del pedido en piso
function detallePedido(id_folio_pedido){
	var idFolioPedido= id_folio_pedido;
	var fechaPedido= $(this).data('fecha');
	var arrayTotal = new Array();
	var j=0;

    $.ajax({
    	type: 'POST',
    	data: {
            idFolioPedido: idFolioPedido,
        },
	    url: window.location.origin+'/yiiNsstore/index.php?r=pedidosFacturaYii/detallePedido',
	    dataType: "json",
	    encoding: "UTF-8",
	    cache: false,
	    success: function (data) {
	    	$("#order-list-detalle tbody tr").remove();
	    	$("#mensajeDetallePedido").html("<div class='box box-small clearfix'><p class='dark'><strong>Pedido con folio " +idFolioPedido+ "- ha sido ordenado a "+fechaPedido+"</strong></p></div>");
	    	$.each(data, function(index, element) {
	    		var randVal= Math.floor( Math.random()*100);
	    		var table = document.getElementById("order-list-detalle").getElementsByTagName('tbody')[0];
	    		var row = table.insertRow(0);
			    var cell1 = row.insertCell(0);
			    var cell2 = row.insertCell(1);
			    var cell3 = row.insertCell(2);
			    var cell4 = row.insertCell(3);
			    var cell5 = row.insertCell(4);
			    var cell6 = row.insertCell(5);

			    cell1.innerHTML= element.id_producto;
			    cell2.innerHTML= element.descripcion;
			    cell3.innerHTML= element.cantidad;
			    cell4.innerHTML= element.precio_unitario;
			    cell5.innerHTML= element.precio_unitario*element.cantidad;
			    var tipoTabla= 'order-list-detalle';
			    cell6.innerHTML= "<a class='btnRmaForm btn btn-default button button-small' onclick=btnRmaForm('"+tipoTabla+"',this) title='Solicitar RMA' id='"+element.id_producto+randVal+"' data-idfoliopedido='"+idFolioPedido+"' data-refprod='"+element.id_producto+"' data-cantidad='"+element.cantidad+"'>Solicitar RMA</a>";
			    arrayTotal[j]= element.precio_unitario*element.cantidad;					 
			    j++;
	    	});

	    	var table = document.getElementById("order-list-detalle").getElementsByTagName('tbody')[0];
	    	var rowL= document.getElementById("order-list-detalle").getElementsByTagName('tbody')[0].getElementsByTagName("tr").length;
		    var row = table.insertRow(rowL);
		    var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		   
		   	var total=0; 
			for(var q=0; q<arrayTotal.length; q++){
				total+=arrayTotal[q];
			} 
		    cell1.innerHTML= "<b>Total</b>";
		    cell1.colSpan= 1;
		    cell2.innerHTML= total;
		    cell2.colSpan= 4;		
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	    	alert('Ha ocurrido un error, intente más tarde');
	    }
   	});
			
}

//Muestra formulario para solicitar el RMA
function btnRmaForm(tabla, item){
	$(item).attr("disabled", true);	
	var idFolioPedido 	= $(item).data('idfoliopedido');
	var referencia 		= $(item).data('refprod');
	var cantidad 		= $(item).data('cantidad');
	var thisBtn			= $(item);

	if(typeof $(item).data('num_serie') !== 'undefined'){//Aquí se entra cuando de un caso de búsqueda por Número de serie se trate (Verificar si el producto fue adquirido con Nsstore), difiere de los procesos de búsqueda por pedido en piso o web
		var index = 0;
		var num_serie 		= $(item).data('num_serie');
		var folio_compra 	= $(item).data('folio_compra');

		uniqId = idFolioPedido; 
		uniqIdCheck = idFolioPedido+'check'; 

	 	let form_lienzo= `<div class="form-group">
			N. Serie: <input type='text' class='${uniqId} form-control n' name='nserie' value=${num_serie} readonly>
		</div>
		<div class="form-group">
			Motivo: <input type='text' class='${uniqId} form-control m' name='motivo'>
		</div>
		<div class="form-group">
			<label>Cuadro de selección RMA</label>
			<input id=${uniqIdCheck} type='checkbox' value='rmaCheck'>
			<input onclick='btnRmaEnviar(this,1)' type='button' value='Enviar' id=${uniqId} 
			data-idfoliopedido=${idFolioPedido} 
			data-referencia=${referencia} 
			data-cantidad=${cantidad} 
			data-foliocompra=${folio_compra}
			data-idfoliopedidoweb='undefined' 
			>
		</div>`;
		$('#verificar_adquirido').html(form_lienzo);//El formulario de solicitud es pintado sobre el elemento verificar_adquirido, en los procesos de pedido en piso o web la forma de pintar el formulario es diferente, ya que se hace dentro de la tabla, aquí se hace afuera de ella
	} else{
		$.ajax({
		 	type: 'POST',
	    	data: {
	            idFolioPedido: idFolioPedido,
	            referencia: referencia,
	            tabla: tabla
	        },
		    url: window.location.origin+'/yiiNsstore/index.php?r=rmasYii/consultarNserie',
		    dataType: "json",
		    encoding: "UTF-8",
		    cache: false,
		    success: function(data){
		    	if(typeof data.m !== 'undefined'){
				    alert(data.m);
				}

				else{
			    	$.each(data, function(index, element) {
			    		
			    		var elementRow= thisBtn.parent().parent().index();
						var table = document.getElementById(tabla).getElementsByTagName('tbody')[0];
						var row = table.insertRow(elementRow+1);
						row.id = referencia+elementRow; 
						uniqId = idFolioPedido+''+elementRow+''+index; 
						uniqIdCheck = idFolioPedido+''+elementRow+''+index+'check'; 

						var cell1 = row.insertCell(0);
					    var cell2 = row.insertCell(1);
					    var cell3 = row.insertCell(2);
					    var cell4 = row.insertCell(3);

					    cell1.innerHTML= "N. Serie: <input type='text' class='"+uniqId+" form-control n' name='nserie' value='"+element.num_serie+"' readonly>";
					    cell2.innerHTML= "Motivo: <input type='text' class='"+uniqId+" form-control m' name='motivo'>";
					    cell2.colSpan= 3;
					    cell3.innerHTML= "<input id='"+uniqIdCheck+"' type='checkbox' name='vehicle' value='rmaCheck'>";
					    cell4.innerHTML= 
					    "<input onclick='btnRmaEnviar(this)' type='button' value='Enviar' id='"+uniqId+"' data-idfoliopedido='"+idFolioPedido+"' data-referencia='"+referencia+"' data-cantidad='"+cantidad+"' data-idfoliopedidoweb='"+element.folio_pedido+"' data-foliocompra='"+element.folio_compra+"'>";
					});
				}
	    	},
	    	error: function (xhr, ajaxOptions, thrownError) {
	    		alert('Ha ocurrido un error, intente más tarde');
	    	}
		});
	}
}

//Envía el motivo desde el formulario para aplicar el RMA
//tipo_form -> 0= Desde pedidos, 1= desde búsqueda por núm serie
function btnRmaEnviar(item, tipo_form= 0){
	var uniqId= $(item).attr('id');
	var uniqIdCheck= '#' +$(item).attr('id')+ 'check';

	if($(uniqIdCheck).is(':checked')){
		var uniqIdMotivo= "."+uniqId+".form-control.m";

		if($(uniqIdMotivo).val()!= ""){
	 		var idFolioPedido= $(item).data('idfoliopedido');
	 		var referencia= $(item).data('referencia');
	 		var cantidad= $(item).data('cantidad');
	 		var idfoliopedidoweb= $(item).data('idfoliopedidoweb');
	 		var foliocompra= $(item).data('foliocompra');
	 		var btnRmaEnviarTh= $(item);

	 		uniqIdNserie= "." +uniqId+ ".form-control.n";
	 		var valNserie= $(uniqIdNserie).val();
	 		var valMotivo= $(uniqIdMotivo).val();

			$.ajax({
				type: 'POST',
		    	data: {
					cliente: clienteIdPrestashop,
		            idFolioPedido: idFolioPedido,
		            referencia: referencia,
		            valNserie: valNserie,
		            valMotivo: valMotivo,
		            cantidad: cantidad,
		            idfoliopedidoweb: idfoliopedidoweb,
		            foliocompra: foliocompra
		        },
			    url: window.location.origin+'/yiiNsstore/index.php?r=rmasYii/solicitarRma',
			    dataType: "json",
			    encoding: "UTF-8",
			    cache: false,
			    beforeSend: function() {
			    	if(tipo_form==0){
						$(".loadingmessage").show(); 
			    	}
				},
			    success: function (data) {
			    	if(tipo_form==0){
				    	$(".loadingmessage").hide(); 
				    	btnRmaEnviarTh.attr("disabled", true);	
			    	} else{
			    		$('#verificar_adquirido').html('');
			    	}		    	
			    	alert(data.m);	
			    },
			    error: function (xhr, ajaxOptions, thrownError) {
			    	if(tipo_form==0){
				    	$(".loadingmessage").hide(); 
				    } else{
				    	$('#verificar_adquirido').html('');
				    }
			    	alert('Ha ocurrido un error, intente más tarde');
			    }
			});
		}
		else
			alert("El campo motivo es requerido");
	}
	else
		alert("Debe habilitar el cuadro de selección para poder enviar el RMA");
}

$(document).ready(function(){
	//Aquí se muestran las ventanas modales para lo pedidos en piso y en línea
	$(".btnFancyLinea").fancybox({
	    'autoSize': false,
	});

	$(".btnFancyPiso").fancybox({
	    'autoSize': false,
	});

	clienteIdPrestashop= $('#id_cliente').attr('value');

    var consulta_enpiso= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarPedidosFacturasPiso';
	jsGrid.locale('es');
    $("#pedidos_piso").jsGrid({
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
		            url		: consulta_enpiso,
		            data 	: {
		            	datos: filter,
		            	cliente: clienteIdPrestashop
		            }
		        });
		    }
        },
 
        fields: [
            { name: "pd-folio_pedido", type: "text", title: "Folio Pedido"},
            { name: "pd-fecha", type: "date_type", title: "Fecha"},
            { name: "pd-surtido", type: "text", title: "Estado"},
            { name: "fp-folio_factura_electronica", type: "text", title: "No. Factura"},
            { name: "detalle", type: "text", title: "Detalle", filtering: false},
            { name: "xml", type: "text", title: "XML", filtering: false},
            { name: "pdf", type: "text", title: "PDF", filtering: false},
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });
	//js grid En piso - end
	
	//js grid En línea- start
    var consulta_enlinea= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarPedidosFacturasLinea';

    $("#pedidos_enlinea").jsGrid({
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
		            url		: consulta_enlinea,
		            data 	: {
		            	datos: filter,
		            	cliente: clienteIdPrestashop
		            }
		        });
		    }
        },

        fields: [
            { name: "o-reference", type: "text", title: "Folio Pedido"},
            { name: "o-date_add", type: "date_type", title: "Fecha"},
            { name: "o-payment", type: "text", title: "Pago"},
            { name: "estado", type: "text", title: "Estado", width: 250, filtering: false},
            { name: "detalle", type: "text", title: "Detalle", filtering: false},
            { name: "ordenar", type: "text", title: "Ordenar", filtering: false},
			{ name: "xml", type: "text", title: "XML", filtering: false},
            { name: "pdf", type: "text", title: "PDF", filtering: false},
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });
	//js grid En línea- end
	
	//js grid En línea- start
    var consulta_adquirido= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarProductoPorNumSerie';

    $("#adquirido_con_ns").jsGrid({
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
		            url		: consulta_adquirido,
		            data 	: {
		            	datos: filter,
		            	cliente: clienteIdPrestashop
		            },
		            success: function (data) {
				    	if(data.mensaje){//Es pintado el mensaje de error al usuario para notificar que el producto no fue adquirido en nsstore y por ende no aplica para RMA
					    	alert(data.mensaje);
				    	}
				    }
		        });
		    }
        },

        fields: [
            { name: "a-num_serie", type: "text", title: "Número de Serie"},
            { name: "a-id_producto", type: "text", title: "ID Producto", filtering: false},
            { name: "a-descripcion", type: "text", title: "Descripción", filtering: false},
            { name: "solicitar_rma", type: "text", title: "RMA", filtering: false},
			{ name: "xml", type: "text", title: "XML", filtering: false},
            { name: "pdf", type: "text", title: "PDF", filtering: false},
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });
	//js grid En línea- end
});