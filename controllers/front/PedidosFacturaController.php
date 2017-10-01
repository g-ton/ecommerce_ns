<?php
/*Author: J. Damián*/

class PedidosFacturaController extends FrontController
{
    public $auth = true;
    public $php_self = 'pedidos-factura';
    public $authRedirection = 'pedidosFactura';
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
            _THEME_JS_DIR_.'pedidos-factura.min.js',
            _THEME_JS_DIR_.'/jsgrid/jsgrid.min.js',
            _THEME_JS_DIR_.'/jsgrid/i18n/jsgrid-es.js',
            _THEME_JS_DIR_.'/jquery-ui/jquery-ui.min.js',
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
            'invoiceAllowed' => (int)Configuration::get('PS_INVOICE'),
            'reorderingAllowed' => !(bool)Configuration::get('PS_DISALLOW_HISTORY_REORDERING'),
            'slowValidation' => Tools::isSubmit('slowvalidation'),
            'cliente' => $cliente
        ));

        $this->setTemplate(_PS_THEME_DIR_.'pedidosFactura.tpl');
    }

    //Another function to load data in js grid, puede servir de ejemplo para saber como consumir desde ajax un action de un controlador
   /* public function displayAjaxDoSomeAction(){
        if ($this->context->customer->isLogged())
            $cliente= (int)$this->context->customer->id;

        if($_POST['datos']['o-date_add']['f']!= ''){
            $fecha= $_POST['datos']['o-date_add']['f'];
            $date = new DateTime($fecha);
            $fecha_formato = date_format($date, "Y-m-d");
            $_POST['datos']['o-date_add']['f']= $fecha_formato;
        }
        
        $sql_where= Helper::armarWhere($_POST['datos'], 1);

        if ($orders = Order::getCustomerOrdersCustom($this->context->customer->id, false, null, $sql_where)) {
            $arrayIdOrders= array();
            foreach ($orders as &$order) {
                $id_order= $order['o-id_order'];
                $myOrder = new Order((int)$id_order);
                if (Validate::isLoadedObject($myOrder)) {
                    $order['virtual'] = $myOrder->isVirtual(false);
                }

                $url_detalle= $_SERVER['SERVER_NAME'] .'/e-commerce/index.php?controller=order-detail&id_order='. $id_order;
                $url_ordenar= '/e-commerce/pedido?submitReorder=&id_order='. $id_order;

                $ordenar= "<a class='link-button' href=$url_ordenar title='Volver a Ordenar'><i class='icon-refresh'></i>Volver a Ordenar</a>";
                $detalle= "<a class='btn btn-default button button-small' href=javascript:showOrder(1,$id_order,'$url_detalle'); ><span>Detalle<i class='icon-chevron-right right'></i></span></a>";

                $color= $order['order_state_color'];
                $leyenda= $order['order_state'];
                $estado= "<span class='label' style='background-color:" .$color. "; border-color:" .$color. ";'>" .$leyenda. "</span>";

                $order['detalle']= $detalle;
                $order['ordenar']= $ordenar;
                $order['estado']= $estado;
            }
        }  

        echo json_encode($orders);
    }*/
}
