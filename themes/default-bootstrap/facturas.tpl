<h1>{$orders}</h1>
<strong>Consultar Facturas -></strong>

<table id="facturasTabla" style="width:100%">
</table>


<script>
$(document).ready(function(){
	var clienteIdPrestashop = "{$cliente}";
    $("strong").click(function(){
        alert("Consultando...");
        $.ajax({
        	type: 'POST',
        	data: {
                cliente: clienteIdPrestashop,
            },
		    url: 'http://nsstore.mx/yiiNsstore/index.php?r=site/consultarFacturas',
		    dataType: "json",
		    encoding: "UTF-8",
		    cache: false,
		    success: function (data) {
		    	$.each(data, function(index, element) {
		             //$("table").append("<td>"+element.folio_factura+"</td>");
		            var table = document.getElementById("facturasTabla");
				    var row = table.insertRow(0);
				    var cell1 = row.insertCell(0);
				    var cell2 = row.insertCell(1);
				    var cell3 = row.insertCell(2);
				    var cell4 = row.insertCell(3);
				    var cell5 = row.insertCell(4);
				    var cell6 = row.insertCell(5);
				    cell1.innerHTML = element.folio_factura;
				    cell2.innerHTML = element.fecha; 		        
				    cell3.innerHTML = element.cta_pago; 		        
				    cell4.innerHTML = element.tipo_pago; 		        
				    cell5.innerHTML = element.referencia; 		        
				    cell6.innerHTML = element.terminos; 		        
				});
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    }
		});
    });
});
</script>