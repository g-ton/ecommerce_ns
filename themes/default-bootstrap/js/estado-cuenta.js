$(document).ready(function()
{
	var idClienteSistemaLocal= $('#idCliente').val();
	var urlGeneralYii= window.location.origin+'/yiiNsstore/index.php?r=';

	$.ajax({
    	type: 'POST',
    	data: {
            id_cliente_sl: idClienteSistemaLocal,
        },
	    url: urlGeneralYii+'pedidosFacturaYii/montoFacturas',
	    dataType: "json",
	    encoding: "UTF-8",
	    success: function (data) 
	    {
	    	$('#montoTotalCredito').html('<b>$'+data.importeCredito+'</b>');

	    	$('#montoNoVencidas').html('<strong>$'+data.montoFacturasNoVencidas+'</strong>');
	    	$('#1a15').html('<strong>$'+data.primero+'</strong>');
	    	$('#16a30').html('<strong>$'+data.segundo+'</strong>');
	    	$('#31a60').html('<strong>$'+data.tercero+'</strong>');
	    	$('#61a90').html('<strong>$'+data.cuarto+'</strong>');
	    	$('#91mas').html('<strong>$'+data.quinto+'</strong>');

	    	$('#montoNoVencidasRem').html('<strong>$'+data.montoRemisionesNoVencidas+'</strong>');
	    	$('#1a15Rem').html('<strong>$'+data.primero_rem+'</strong>');
	    	$('#16a30Rem').html('<strong>$'+data.segundo_rem+'</strong>');
	    	$('#31a60Rem').html('<strong>$'+data.tercero_rem+'</strong>');
	    	$('#61a90Rem').html('<strong>$'+data.cuarto_rem+'</strong>');
	    	$('#91masRem').html('<strong>$'+data.quinto_rem+'</strong>');
	    	
	    	$('#creditoDisponible').html('<b>$'+data.credito_disponible+'</b>');

	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	    }
	});

	///Jqxgrid Widget
	var url = window.location.origin+'/yiiNsstore/index.php?r=pedidosFacturaYii/jsonFacturasRemisiones';
    // prepare the data
    var source =
    {
       	datatype: 'json',
	    datafields: [
            { name: 'folio', type: 'int' },
            { name: 'fecha', type: 'string' },
            { name: 'dias_credito', type: 'string'},
            { name: 'folio_pedido', type: 'int' },
            { name: 'tipo', type: 'string' },
            { name: 'monto', type: 'float' }
	    ],
        id: 'id',
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // create jqxgrid.
    var renderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        return '<span>$</span>'+value;
    }
    $("#jqxgrid").jqxGrid(
    {
        width: '100%',
        source: dataAdapter,
        columnsresize: true,
        columns: [
          { text: 'No.', dataField: 'folio', width: 200 },
          { text: 'Tipo', dataField: 'tipo', width: 90 },
          { text: 'Fecha', dataField: 'fecha', width: 200 },
          { text: 'Días', dataField: 'dias_credito', width: 180 },
          { text: 'No. Pedido', dataField: 'folio_pedido', width: 80 },
          { text: 'Monto', dataField: 'monto', cellsrenderer: renderer}
        ]
    });          
});