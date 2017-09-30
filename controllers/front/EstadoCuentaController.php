<?php
/*Author: J. Damián*/

class EstadoCuentaController extends FrontController
{
    public $auth = true;
    public $php_self = 'estado-cuenta';
    public $authRedirection = 'estadoCuenta';
    public $ssl = true;

    public function setMedia()
    {
        parent::setMedia();
        $this->addCSS(array(
            _THEME_CSS_DIR_.'history.css',
            _THEME_CSS_DIR_.'addresses.css',
            _THEME_CSS_DIR_.'/styles-jqx/jqx.base.css',
        ));
        $this->addJS(array(
            _THEME_JS_DIR_.'history.js',
            _THEME_JS_DIR_.'estado-cuenta.js',
            _THEME_JS_DIR_.'tools.js', // retro compat themes 1.5

            _THEME_JS_DIR_.'/jqwidgets/jqxcore.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxbuttons.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxscrollbar.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxmenu.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxgrid.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxgrid.selection.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxgrid.columnsresize.js',
            _THEME_JS_DIR_.'/jqwidgets/jqxdata.js',
        ));
        $this->addJqueryPlugin(array('scrollTo', 'footable', 'footable-sort'));
    }

    /**
     * Assign template vars related to page content
     * @see FrontController::initContent()
     */
    public function initContent()
    {
        parent::initContent();

        //Conocer el id del cliente prestashop
        if ($this->context->customer->isLogged())
            $id_cliente_ps= (int)$this->context->customer->id;

        if(isset($id_cliente_ps)){
            //Obtener id cliente sistema local para interactuar con la BD del SL
            $customer = new Customer((int)($id_cliente_ps));
            $id_cliente_ps= $id_cliente_ps;
            $id_cliente_sl= $customer->id_original_cliente;
        }
        else{
            $id_cliente_ps= '';
            $id_cliente_sl= '';
        }

        $this->context->smarty->assign(array(
            'slowValidation' => Tools::isSubmit('slowvalidation'),
            'id_cliente_ps' => $id_cliente_ps,
            'id_cliente_sl' => $id_cliente_sl,
            'fecha_actual' => date('Y-m-d'),
        ));
	//
        $this->setTemplate(_PS_THEME_DIR_.'estadoCuenta.tpl');
    }
}
