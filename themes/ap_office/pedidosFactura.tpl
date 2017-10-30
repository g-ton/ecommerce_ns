{capture name=path}
	<a href="{$link->getPageLink('my-account', true)|escape:'html':'UTF-8'}">
		Mi Cuenta
	</a>
	<span class="navigation-pipe">{$navigationPipe}</span>
	<span class="navigation_page">Mis Pedidos / Facturas</span>
{/capture}
{include file="$tpl_dir./errors.tpl"}
<h1 class="page-heading bottom-indent">Historial de Pedidos</h1>

<!-- Se almacena el id del cliente en variable oculta para ser consumida por el js y mandarlo al action correspondiente -->
<input type="hidden" id="id_cliente" value="{$cliente}">

{if $slowValidation}
	<p class="alert alert-warning">{l s='If you have just placed an order, it may take a few minutes for it to be validated. Please refresh this page if your order is missing.'}</p>
{/if}

<div class="block-center" id="block-history">	
	<!-- Navegador de pestañas -->
	<ul class="nav nav-tabs">
      <li class="active mypestana_fondo"><a href="#wed" data-toggle="tab">Pedidos Web</a></li>
      <li class="mypestana_fondo"><a href="#enpiso" data-toggle="tab">Pedidos en Piso</a></li>
    </ul>

    <div class="tab-content">
    	<div class="tab-pane fade in active" id="wed">
			<!-- Js Grid - start -->
			<div id="pedidos_enlinea"></div>
			<!-- Js Grid - end -->

			<!-- Tabla oculta para el detalle de pedido -->
			<div style="display:none">
				<div id="block-order-detail" class="unvisible">&nbsp;</div>
			</div>
    	</div>

    	<div class="tab-pane fade" id="enpiso" >
			<!-- Js Grid - start -->
			<div id="pedidos_piso"></div>
			<!-- Js Grid - end -->

			<!-- Tabla oculta para el detalle de pedido -->
			<div id="divDetallePedido" style="display: none;">
				<div class='loadingmessage' style='display: none; position: fixed; top: 50%; left: 50%;'>
				  <img src='{$img_dir}cargando.gif'/>
				</div>

				<div id="mensajeDetallePedido"></div>

				<div class="table-responsive">
					<table id="order-list-detalle" class="table table-bordered">
						<thead>
							<tr>
								<th class="first_item" data-sort-ignore="true">Referencia</th>
								<th class="item">Producto</th>
								<th class="item">Cantidad</th> 
								<th class="item">Precio Unitario</th>
								<th class="last_item">Precio Total</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
    	</div>

    </div>
</div>

<ul class="footer_links clearfix">
	<li>
		<a class="btn btn-default button button-small" href="{$link->getPageLink('my-account', true)|escape:'html':'UTF-8'}">
			<span>
				<i class="icon-chevron-left"></i> Volver a su cuenta
			</span>
		</a>
	</li>
	<li>
		<a class="btn btn-default button button-small" href="{$base_dir}">
			<span><i class="icon-chevron-left"></i> Inicio</span>
		</a>
	</li>
</ul>