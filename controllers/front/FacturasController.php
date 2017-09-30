<?php

class FacturasControllerCore extends FrontController
{
    public $auth = true;
    public $php_self = 'facturas';
    public $authRedirection = 'facturas';
    public $ssl = true;


    /**
     * Assign template vars related to page content
     * @see FrontController::initContent()
     */
    public function initContent()
    {
        parent::initContent();
        if ($this->context->customer->isLogged())
            $cliente= (int)$this->context->customer->id;

        $this->context->smarty->assign(array(
            'orders' => "Consulta de Facturas",
            'cliente' => $cliente,
        ));

        $this->setTemplate(_PS_THEME_DIR_.'facturas.tpl');
    }
}
