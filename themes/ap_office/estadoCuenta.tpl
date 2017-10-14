<h1 class="page-heading bottom-indent">Estado de Cuenta</h1>
<div class="row" style="margin-bottom: 15px;">
	<div class="col-md-6 col-offset-6">Datos vigentes a la fecha: {$fecha_actual}</div>
</div>

<div class="container">
	<table class="table table-condensed my-tabla-strong">
	  <tr>
	    <th>Crédito</th>
	    <th></th>
	    <th></th>
	  </tr>
	  <tr>
	    <td>Monto total en la línea de Crédito</td>
	    <td></td>
	    <td id='montoTotalCredito' style='color: green;'></td>
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

<h1 class="page-heading bottom-indent">Detalle "Facturas - Remisiones" vencidas al: {$fecha_actual} </h1>

<!-- Navegador de pestañas -->
<ul class="nav nav-tabs">
  <li class="active"><a href="#fact" data-toggle="tab">Facturas</a></li>
  <li><a href="#rem" data-toggle="tab">Remisiones</a></li>
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
</div>