<?php
/*Author: J. Damián*/

class RmasController extends FrontController
{
    public $auth = true;
    public $php_self = 'rmas';
    public $authRedirection = 'rmas';
    public $ssl = true;

    public function setMedia()
    {
        parent::setMedia();
        $this->addCSS(array(
            _THEME_CSS_DIR_.'history.css',
            _THEME_CSS_DIR_.'addresses.css',
            _THEME_CSS_DIR_.'/jsgrid/jsgrid.min.css',
            _THEME_CSS_DIR_.'/jsgrid/jsgrid-theme.min.css',
            _THEME_CSS_DIR_.'/jquery-ui/jquery-ui.min.css',
        ));
        $this->addJS(array(
            _THEME_JS_DIR_.'history.js',
            _THEME_JS_DIR_.'tools.js', // retro compat themes 1.5
            _THEME_JS_DIR_.'rmas.js',
            _THEME_JS_DIR_.'/jsgrid/jsgrid.min.js',
            _THEME_JS_DIR_.'/jsgrid/i18n/jsgrid-es.js',
            _THEME_JS_DIR_.'/jquery-ui/jquery-ui.min.js',
            _THEME_JS_DIR_.'my-datepicker.js',

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

         //Conocer el id del cliente
        if ($this->context->customer->isLogged())
            $cliente= (int)$this->context->customer->id;

        $this->context->smarty->assign(array(
            'slowValidation' => Tools::isSubmit('slowvalidation'),
            'cliente' => $cliente
        ));

        $this->setTemplate(_PS_THEME_DIR_.'rmas.tpl');
    }
}
