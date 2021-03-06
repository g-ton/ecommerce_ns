$(document).ready(function()
{
	var idClienteSistemaLocal= $('#idCliente').val();
	var urlGeneralYii= window.location.origin+'/yiiNsstore/index.php?r=';

    //Datos sobre Saldo y crédito - start
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
            $('#montoTotalCredito').html('<b>'+data.importeCredito+'</b>');
            $('#creditoDisponible').html('<b>'+data.credito_disponible+'</b>');
            $('#montoNoVencidas').html('<strong>'+data.montoFacturasNoVencidas+'</strong>');
            $('#saldoFavor').html('<strong>'+data.saldo_favor+'</strong>');

            $('#1a15').html('<strong>'+data.primero+'</strong>');
            $('#16a30').html('<strong>'+data.segundo+'</strong>');
            $('#31a60').html('<strong>'+data.tercero+'</strong>');
            $('#61a90').html('<strong>'+data.cuarto+'</strong>');
            $('#91mas').html('<strong>'+data.quinto+'</strong>');

            $('#montoNoVencidasRem').html('<strong>'+data.montoRemisionesNoVencidas+'</strong>');
            $('#1a15Rem').html('<strong>'+data.primero_rem+'</strong>');
            $('#16a30Rem').html('<strong>'+data.segundo_rem+'</strong>');
            $('#31a60Rem').html('<strong>'+data.tercero_rem+'</strong>');
            $('#61a90Rem').html('<strong>'+data.cuarto_rem+'</strong>');
            $('#91masRem').html('<strong>'+data.quinto_rem+'</strong>');
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Ha ocurrido un error, intente de nuevo más tarde');
        }
    });
    //Datos sobre Saldo y crédito - end
    
    //Grids
    jsGrid.locale('es');
    var consulta_facturas= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarFactura';
    var consulta_rems= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarRemision';
    var consulta_nc= window.location.origin + '/yiiNsstore/index.php?r=pedidosFacturaYii/consultarNC';

    $("#facturas").jsGrid({
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
                    type    : "POST",
                    dataType: "json",
                    url     : consulta_facturas,
                    data    : {
                        datos: filter,
                        id_cliente_sl: idClienteSistemaLocal
                    }
                });
            }
        },
 
        fields: [
            { name: "folio_factura", type: "text", title: "Folio Factura", width: "60"},
            { name: "fecha", type: "date_type", title: "Fecha"},
            { name: "dias_credito", type: "text", title: "Días Crédito", width: "60"},
            { name: "monto_total", type: "text", title: "Monto Total", filtering: false},
            { name: "abonado", type: "text", title: "Abonado", filtering: false},
            { name: "saldo", type: "text", title: "Saldo Final", filtering: false},
            { name: "detalle", type: "text", title: "Detalle", filtering: false},
            //Con esto se pintan las opciones de búsqueda y limpiado
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });

    $("#remisiones").jsGrid({
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
                    type    : "POST",
                    dataType: "json",
                    url     : consulta_rems,
                    data    : {
                        datos: filter,
                        id_cliente_sl: idClienteSistemaLocal
                    }
                });
            }
        },
 
        fields: [
            { name: "folio_remision", type: "text", title: "Folio Remisión", width: "60"},
            { name: "fecha", type: "date_type", title: "Fecha"},
            { name: "dias_credito", type: "text", title: "Días Crédito", width: "60"},
            { name: "monto_total", type: "text", title: "Monto Total", filtering: false},
            { name: "abonado", type: "text", title: "Abonado", filtering: false},
            { name: "saldo", type: "text", title: "Saldo Final", filtering: false},
            { name: "detalle", type: "text", title: "Detalle", filtering: false},
            //Con esto se pintan las opciones de búsqueda y limpiado
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });  

    $("#notas_credito").jsGrid({
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
                    type    : "POST",
                    dataType: "json",
                    url     : consulta_nc,
                    data    : {
                        datos: filter,
                        id_cliente_sl: idClienteSistemaLocal
                    }
                });
            }
        },
 
        fields: [
            { name: "folio_ncp", type: "text", title: "Folio Nota de Crédito"},
            { name: "fecha", type: "date_type", title: "Fecha"},
            { name: "importe", type: "text", title: "Monto Total"},
            { name: "folio_factura_electronica", type: "text", title: "Folio Factura Origen"},
            { name: "estatus", type: "text", title: "Estatus", filtering: false},
            { name: "aplicada", type: "text", title: "Aplicada", filtering: false},
            //Con esto se pintan las opciones de búsqueda y limpiado
            { type: "control", editButton: false, deleteButton: false, modeSwitchButton: false }
        ]
    });

    $(".btnFancyFac").fancybox({});  

});

function detallePago(id_documento, tipo){
    //tipo = 0 = factura
    //tipo = 1 = remisión
    $.ajax({
        type: 'POST',
        data: {
            id_documento: id_documento,
            tipo: tipo
        },
        url: window.location.origin+'/yiiNsstore/index.php?r=pedidosFacturaYii/consultarPago',
        dataType: "json",
        encoding: "UTF-8",
        cache: false,
        success: function (data) {
            //Limpia la tabla antes de cada resultado
            $('#my-tabla-pagos > tbody').empty();
            $('#detalle_pagos #mensaje').text(data.mensaje);    

            if(data.pagos!= false){
                $.each(data.pagos,function(i,value){
                    $('#my-tabla-pagos').css('display', 'block');
                    $('#my-tabla-pagos > tbody:last-child').append('<tr><td>'+value.tipo+'</td><td>'+value.fecha+'</td><td>'+value.importe+'</td><td>'+value.monto_apagar+'</td></tr>'); 
                });
            } else{
                $('#my-tabla-pagos').css('display', 'none');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Ha ocurrido un error, intente más tarde');
        }
    });

}