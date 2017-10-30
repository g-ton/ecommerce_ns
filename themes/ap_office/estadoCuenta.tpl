<h1 class="page-heading bottom-indent">Estado de Cuenta</h1>
<div class="row" style="margin-bottom: 15px;">
	<div class="col-md-6 col-offset-6">Datos de Crédito a la fecha: {$fecha_actual}</div>
</div>

<div class="container">
	<table class="table table-condensed my-tabla-strong">
	  <tr>
	    <td>Monto total en la línea de Crédito</td>
	    <td></td>
	    <td id='montoTotalCredito' style='color: green;'></td>
	  </tr>
	  <tr>
	    <td><strong>Saldo a Favor</strong></td>
	    <td id='saldoFavor' style='color: green;'></td>
	    <td></td>
	  </tr>
	  <tr>
	    <th></th>
	    <th>Facturas</th>
	    <th>Remisiones</th>
	  </tr>
	  <tr>
	    <td>Vencidas entre 1-15 días</td>
	    <td id='1a15'></td>
	    <td id='1a15Rem'></td>
	  </tr>
	  <tr>
	    <td>Vencidas entre 16-30 días</td>
	    <td id='16a30'></td>
	    <td id='16a30Rem'></td>
	  </tr>
	  <tr>
	    <td>Vencidas entre 31-60 días</td>
	    <td id='31a60'></td>
	    <td id='31a60Rem'></td>
	  </tr>
	  <tr>
	    <td>Vencidas entre 61-90 días</td>
	    <td id='61a90'></td>
	    <td id='61a90Rem'></td>
	  </tr> 
	  <tr>
	    <td>Vencidas entre 91 o más días</td>
	    <td id='91mas'></td>
	    <td id='91masRem'></td>
	  </tr>
	  <tr>
	    <td>Monto total Facturas / Remisiones sin vencer</td>
	    <td id='montoNoVencidas'></td>
	    <td id='montoNoVencidasRem'></td>
	  </tr>
	  <tr>
	    <td><strong>Crédito Disponible</strong></td>
	    <td></td>
	    <td id='creditoDisponible' style='color: green;'></td>
	  </tr>
	</table>
</div>

<input type="hidden" id="idCliente" value="{$id_cliente_sl}">

<h1 class="page-heading bottom-indent">Detalle "Facturas - Remisiones" vencidas y Notas de Crédito al: {$fecha_actual} </h1>

<!-- Navegador de pestañas -->
<ul class="nav nav-tabs">
  <li class="active mypestana_fondo"><a href="#fact" data-toggle="tab">Facturas</a></li>
  <li class="mypestana_fondo"><a href="#rem" data-toggle="tab">Remisiones</a></li>
  <li class="mypestana_fondo"><a href="#nc" data-toggle="tab">Notas de Crédito</a></li>
</ul>

<div class="tab-content">
	<div class="tab-pane fade in active" id="fact">
		<!-- Js Grid - start -->
		<div id="facturas"></div>
		<!-- Js Grid - end -->
	</div>

	<div class="tab-pane fade" id="rem" >
		<!-- Js Grid - start -->
		<div id="remisiones"></div>
		<!-- Js Grid - end -->
	</div>

	<div class="tab-pane fade" id="nc" >
		<!-- Js Grid - start -->
		<div id="notas_credito"></div>
		<!-- Js Grid - end -->
	</div>
</div>

<!-- Elemento donde se muestra el contenido del fancybox -->
<div id="divDetallePago" style="display: none;">
	<div id="detalle_pagos">
		<h1 id="mensaje" class="page-heading bottom-indent"></h1>
		<table id="my-tabla-pagos" class="table table-condensed" style="display: none;">
		  	<thead>
				<tr>
					<th>Tipo Pago</th>
					<th>Fecha</th>
					<th>Monto Cubierto</th>
					<th>Monto Restante</th>
				</tr>
		  	</thead>

		  	<tbody></tbody>
		</table>
	</div>
</div>






