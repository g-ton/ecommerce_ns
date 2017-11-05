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

            _THEME_CSS_DIR_.'/jsgrid/jsgrid.min.css',
            _THEME_CSS_DIR_.'/jsgrid/jsgrid-theme.min.css',
            _THEME_CSS_DIR_.'/jquery-ui/jquery-ui.min.css',
        ));
        $this->addJqueryUI('ui.datepicker');
        $this->addJS(array(
            _THEME_JS_DIR_.'history.js',
            _THEME_JS_DIR_.'tools.js', // retro compat themes 1.5
            _THEME_JS_DIR_.'/jsgrid/jsgrid.min.js',
            _THEME_JS_DIR_.'/jsgrid/i18n/jsgrid-es.js',
            _THEME_JS_DIR_.'my-datepicker.js',
            _THEME_JS_DIR_.'estado-cuenta.js',
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
            'fecha_actual' => date('d-m-Y'),
        ));
	//
        $this->setTemplate(_PS_THEME_DIR_.'estadoCuenta.tpl');
    }
}
