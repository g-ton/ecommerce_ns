{include file="$tpl_dir./errors.tpl"}
<h1 class="page-heading bottom-indent">RMA Devoluci&oacute;n de mercanc&iacute;a</h1>
<div class="table-responsive">
	<table id="rma-list" class="table table-bordered footab">
		<thead>
			<tr>
				<th class="first_item" data-sort-ignore="true">Folio RMA</th>
				<th class="item" data-sort-ignore="true">Folio Pedido</th> <!-- Hide in phones -->
				<th class="item" data-sort-ignore="true">Folio Pedido Web</th> <!-- Hide in phones -->
				<th class="item" data-sort-ignore="true">Producto Ref.</th>
				<th class="item" data-sort-ignore="true">N. Serie</th>
				<th class="item">Fecha Entrada</th>
				<th class="item">Fecha Entrega</th>
				<th data-sort-ignore="true" class="item" >Motivo</th> <!-- Hide in phones -->
				<th data-sort-ignore="true" class="item">Estado</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>
<div id="sinRmas"></div>

<script>
$(document).ready(function(){
	var clienteIdPrestashop = "{$cliente}";
	
	setTimeout(function () {
	    $.ajax({
	    	type: 'POST',
	    	data: {
	            cliente: clienteIdPrestashop,
	        },
		    url: 'http://nsstore.mx/yiiNsstore/index.php?r=rmasYii/consultarRma',
		    dataType: "json",
		    encoding: "UTF-8",
		    cache: false,
		    success: function (data) {
		    	$.each(data, function(index, element) {  
		            var table = document.getElementById("rma-list").getElementsByTagName('tbody')[0];
				    var row = table.insertRow(0);
				    var cell1 = row.insertCell(0);
				    var cell2 = row.insertCell(1);
				    var cell3 = row.insertCell(2);
				    var cell4 = row.insertCell(3);
				    var cell5 = row.insertCell(4);
				    var cell6 = row.insertCell(5);
				    var cell7 = row.insertCell(6);
				    var cell8 = row.insertCell(7);
				    var cell9 = row.insertCell(8);
				    cell1.innerHTML = element.folio_rma;
				    cell2.innerHTML = element.folio_pedido; 		        
				    cell3.innerHTML = element.folio_pedido_web; 		        
				    cell4.innerHTML = element.referencia;					    		    	
				    cell5.innerHTML = element.num_serie;					    		    	
				    cell6.innerHTML = element.fecha_entrada;					    		    	
			    	cell7.innerHTML = element.fecha_entrega;
				    cell8.innerHTML = element.motivo_rma; 
				    if(element.status_rma== 'S'){
				    	cell9.innerHTML = "<span class='label dark' style='background-color:#32CD32; border-color:#32CD32;'>Soluci&oacute;n</span> <a  id='"+element.folio_rma+"' class='btnDiagnostico btn btn-default button button-small'>Diagnóstico</a>";
				    }

				    else if(element.status_rma== 'E'){
				    	cell9.innerHTML = "<span class='label' style='background-color:#108510; border-color:#108510;'>Entregado</span> <a  id='"+element.folio_rma+"' class='btnDiagnostico btn btn-default button button-small'>Diagnóstico</a>";
				    }

				   	else		        				    		        
				    	cell9.innerHTML = "<span class='label' style='background-color:#4169E1; border-color:#4169E1;'>Recibido</span>";
				});
				if (!$.trim(data))
		    		$("#sinRmas").html("<p class='alert alert-warning'>No se han encontrado rmas</p>");
				$(document).trigger("lanzadorDiagnostico");
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    }
		});
	}, 1500);

	/*Evento para obtener el diagnóstico del RMA*/
	$( document ).on( "lanzadorDiagnostico",function(event){
		$(".btnDiagnostico").click(function(){
			$(this).attr("disabled", true);	
			var folio_rma= $(this).attr('id');
			var thisBtn= $(this);

			$.ajax({
				type: 'POST',
		    	data: {
		            folio_rma: folio_rma,
		        },
			    url: 'http://nsstore.mx/yiiNsstore/index.php?r=rmasYii/consultarDiagnosticoRma',
			    dataType: "json",
			    encoding: "UTF-8",
			    cache: false,
			    success: function (data) {
					var elementRow= thisBtn.parent().parent().index();
					var table = document.getElementById('rma-list').getElementsByTagName('tbody')[0];
					var row = table.insertRow(elementRow+1);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);

					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					cell1.innerHTML= "Diagn&oacute;stico:";
					cell2.innerHTML= data.resultado_text;
					cell3.innerHTML= "Resultado:";
					cell4.innerHTML= data.diagnostico;
					cell4.colSpan= 5;
			    },
			    error: function (xhr, ajaxOptions, thrownError) {
			    }
			});
		});
	});
});
</script>