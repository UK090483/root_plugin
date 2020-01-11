<?php
require_once plugin_dir_path(__FILE__) . 'icons.php';
require_once plugin_dir_path(__FILE__) . './widget/iconWidget.php';
require_once plugin_dir_path(__FILE__) . './nav/nav.php';


class ku_base_icons
{
    static function init()
    {

        add_action('wp_ajax_ku_base_icons', array(__CLASS__, 'get_icons'));
        add_action('wp_ajax_nopriv_ku_base_icons', array(__CLASS__, 'get_icons'));
    }

    static function get_icons()
    {
        $icons = new Ku_SVG_Icons();
        $i = $icons->get_svg_gutenberg();
        wp_send_json($i, 1);
        die();
    }
}

add_action('init', array('ku_base_icons', 'init'));
