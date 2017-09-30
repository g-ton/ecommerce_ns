{capture name=path}
	<a href="{$link->getPageLink('my-account', true)|escape:'html':'UTF-8'}">
		Mi Cuenta
	</a>
	<span class="navigation-pipe">{$navigationPipe}</span>
	<span class="navigation_page">Mis RMAs</span>
{/capture}
{include file="$tpl_dir./errors.tpl"}
<h1 class="page-heading bottom-indent">RMA Devolución de mercancía</h1>

<!-- Se almacena el id del cliente en variable oculta para ser consumida por el js y mandarlo al action correspondiente -->
<input type="hidden" id="id_cliente" value="{$cliente}">

<!-- Js Grid - start -->
<div id="rmas_grid"></div>
<!-- Js Grid - end -->

<div id="div_diagnostico" style="display: none;" class="table-responsive">
	<div class='box box-small clearfix'><p class='dark'><strong>Diagnóstico Nsstore sobre el Producto Devuelto</strong></p></div>
	<table id="tabla-diagnostico" class="table table-bordered">
		<thead>
			<tr>
				<th class="item" data-sort-ignore="true">Diagnóstico</th>
				<th class="item" data-sort-ignore="true">Resultado</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>