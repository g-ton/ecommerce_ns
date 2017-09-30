{capture name=path}
	<a href="{$link->getPageLink('my-account', true)|escape:'html':'UTF-8'}">
		Mi Cuenta
	</a>
	<span class="navigation-pipe">{$navigationPipe}</span>
	<span class="navigation_page">Mis Pedidos / Facturas</span>
{/capture}
{include file="$tpl_dir./errors.tpl"}
<h1 class="page-heading bottom-indent">Historial de Pedidos</h1>

<p class="info-title">Lista de pedidos</p>
{if $slowValidation}
	<p class="alert alert-warning">{l s='If you have just placed an order, it may take a few minutes for it to be validated. Please refresh this page if your order is missing.'}</p>
{/if}
<div class="block-center" id="block-history">	

	{if $orders && count($orders)}
		<h1 class="page-subtitulo">Pedidos Web</h1>
		<table id="order-list-enpiso1" class="table table-bordered footab">
			<thead>
				<tr>
					<th class="first_item" data-sort-ignore="true">{l s='Folio Pedido'}</th>
					<th class="item">{l s='Fecha'}</th>
					<th data-sort-ignore="true" class="item" data-hide="phone">{l s='Pago'}</th>
					<th class="item" data-hide="phone">{l s='Estado'}</th>
					<th class="item" data-hide="phone,tablet">Detalle</th>
					<th data-sort-ignore="true" class="item">{l s='Factura'}</th>
					<!-- <th data-sort-ignore="true" class="last_item">&nbsp;</th> -->
				</tr>
			</thead>
			<tbody>
				{foreach from=$orders item=order name=myLoop}
					<tr class="{if $smarty.foreach.myLoop.first}first_item{elseif $smarty.foreach.myLoop.last}last_item{else}item{/if} {if $smarty.foreach.myLoop.index % 2}alternate_item{/if}">
						<!-- Folio pedido -->
						<td class="history_link bold">
							{if isset($order.invoice) && $order.invoice && isset($order.virtual) && $order.virtual}
								<img class="icon" src="{$img_dir}icon/download_product.gif"	alt="{l s='Products to download'}" title="{l s='Products to download'}" />
							{/if}
							<a id="{($order.id_order)}web" data-foliopedido="{Order::getUniqReferenceOf($order.id_order)}" class="color-myaccount" href="javascript:showOrder(1, {$order.id_order|intval}, '{$link->getPageLink('order-detail', true, NULL, "id_order={$order.id_order|intval}")|escape:'html':'UTF-8'}');">
								{Order::getUniqReferenceOf($order.id_order)}
							</a>
						</td>
						<!-- Fecha -->
						<td data-value="{$order.date_add|regex_replace:"/[\-\:\ ]/":""}" class="history_date bold">
							{dateFormat date=$order.date_add full=0}
						</td>
						<!-- Pago -->
						<td class="history_method">{$order.payment|escape:'html':'UTF-8'}</td>
						<!-- Estado -->
						<td{if isset($order.order_state)} data-value="{$order.id_order_state}"{/if} class="history_state">
							{if isset($order.order_state)}
								<span class="label{if isset($order.order_state_color) && Tools::getBrightness($order.order_state_color) > 128} dark{/if}"{if isset($order.order_state_color) && $order.order_state_color} style="background-color:{$order.order_state_color|escape:'html':'UTF-8'}; border-color:{$order.order_state_color|escape:'html':'UTF-8'};"{/if}>
									{$order.order_state|escape:'html':'UTF-8'}
								</span>
							{/if}
						</td>
						<!-- Detalle -->
						<td class="history_detail">
							<a class="btn btn-default button button-small" href="javascript:showOrder(1, {$order.id_order|intval}, '{$link->getPageLink('order-detail', true, NULL, "id_order={$order.id_order|intval}")|escape:'html':'UTF-8'}');">
								<span>
									{l s='Details'}<i class="icon-chevron-right right"></i>
								</span>
							</a>
							{if isset($opc) && $opc}
								<a class="link-button" href="{$link->getPageLink('order-opc', true, NULL, "submitReorder&id_order={$order.id_order|intval}")|escape:'html':'UTF-8'}" title="{l s='Reorder'}">
							{else}
								<a class="link-button" href="{$link->getPageLink('order', true, NULL, "submitReorder&id_order={$order.id_order|intval}")|escape:'html':'UTF-8'}" title="{l s='Reorder'}">
							{/if}
								{if isset($reorderingAllowed) && $reorderingAllowed}
									<i class="icon-refresh"></i>{l s='Reorder'}
								{/if}
							</a>
						</td>
					</tr>
				{/foreach}
			</tbody>
		</table>
		<div id="block-order-detail" class="unvisible">&nbsp;</div>
	{else}
		<p class="alert alert-warning">No tiene ning&uacute;n pedido en l&iacute;nea</p>
	{/if}

	<h1 class="page-subtitulo">Pedidos En Piso</h1>
	<table id="order-list-enpiso" class="table table-bordered footab">
		<thead>
			<tr>
				<th class="first_item" data-sort-ignore="true">{l s='Folio Pedido'}</th>
				<th class="item">{l s='Fecha'}</th>
				<th data-sort-ignore="true" class="item" data-hide="phone">{l s='Pago'}</th> <!-- Hide in phones -->
				<th class="item" data-hide="phone">{l s='Estado'}</th> <!-- Hide in phones -->
				<th data-sort-ignore="true" class="item">{l s='Factura'}</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	<div id="sinPedidoPiso"></div>
	<!-- Tabla oculta para el detalle de pedido -->
	<div id="divDetallePedido" style="display: none;" class="table-responsive">
		<div class='loadingmessage' style='display: none; position: fixed; top: 50%; left: 50%;'>
		  <img src='{$img_dir}cargando.gif'/>
		</div>
		<div id="mensajeDetallePedido"></div>
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


<script>

</script>