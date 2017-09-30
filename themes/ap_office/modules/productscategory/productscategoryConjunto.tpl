{*
* 2007-2016 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2016 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}
{if count($categoryProducts) > 0 && $categoryProducts !== false}
{$iterador = 2}

<section class="page-product-box blockproductscategory">

	<div style="margin-bottom: 60px; margin-top: 20px;">
		<h4 class="page-subheading productscategory_h3">
			<span>Comprados juntos habitualmente</span>
		</h4>
	</div>

	<div class="container">
			<!-- {$categoryProducts|@var_dump} -->
		{foreach from=$categoriasDistinct item='categoryDistinct' name=categoryDistinct}
		<div id="productscategory_list" class="col-md-6" style="margin-bottom: 55px;">
			<strong>{$categoryDistinct}</strong>
 			<ul id="bxslider{$iterador}" class="bxslider clearfix">		
			{foreach from=$categoryProducts item='categoryProduct' name=categoryProduct}

				{if $categoryDistinct == $categoryProduct.category_default}

				<li class="product-box item product-block" style="float: left; list-style: outside none none; position: relative; margin-right: 20px; width: 95px; font-size: 13px;"> 
					<a href="{$link->getProductLink($categoryProduct.id_product, $categoryProduct.link_rewrite, $categoryProduct.category, $categoryProduct.ean13)}" class="lnk_img product-image" title="{$categoryProduct.name|htmlspecialchars}">

					<img src="{$link->getImageLink($categoryProduct.link_rewrite, $categoryProduct.id_image, 'home_default')|escape:'html':'UTF-8'}" alt="{$categoryProduct.name|htmlspecialchars}" /></a> 
					<h5 itemprop="name" class="name nombre-producto-conjunto">
						<a class="product-name" href="{$link->getProductLink($categoryProduct.id_product, $categoryProduct.link_rewrite, $categoryProduct.category, $categoryProduct.ean13)|escape:'html':'UTF-8'}" title="{$categoryProduct.name|htmlspecialchars}">{$categoryProduct.name|truncate:30:'...'|escape:'html':'UTF-8'}</a>
					</h5>
					{if $ProdDisplayPrice && $categoryProduct.show_price == 1 && !isset($restricted_country_mode) && !$PS_CATALOG_MODE}
						<p class="price_display">
						{if isset($categoryProduct.specific_prices) && $categoryProduct.specific_prices
						&& ($categoryProduct.displayed_price|number_format:2 !== $categoryProduct.price_without_reduction|number_format:2)}

							<span class="price producto-precio-conjunto">
								{convertPrice price=$categoryProduct.displayed_price}
							</span>
							<span class="price producto-precio-conjunto" style="color: orange; text-decoration: line-through;">
								{displayWtPrice p=$categoryProduct.price_without_reduction}
							</span>
						{else}
							<span class="price producto-precio-conjunto">
								{convertPrice price=$categoryProduct.displayed_price}
							</span>
						{/if}
						</p>
					{else}
					<br />
					{/if}
					<div class="clearfix" style="margin-top:5px">
						{if !$PS_CATALOG_MODE && ($categoryProduct.allow_oosp || $categoryProduct.quantity > 0)}
							<div class="no-print">
								<a class="exclusive button ajax_add_to_cart_button conjunto" href="{$link->getPageLink('cart', true, NULL, "qty=1&amp;id_product={$categoryProduct.id_product|intval}&amp;token={$static_token}&amp;add")|escape:'html':'UTF-8'}" data-id-product="{$categoryProduct.id_product|intval}" title="{l s='Añadir al carrito' mod='productscategory'}">
									<span>A&ntilde;adir</span>
								</a>
							</div>
						{/if}
					</div> 
				</li>
				{/if}
			{/foreach}
			</ul>
		</div>
		{if $iterador == 3} <div class="clearfix visible-md-block"></div> {/if}
		{$iterador = $iterador+1}
		{/foreach}
	</div>
</section>
{/if}
