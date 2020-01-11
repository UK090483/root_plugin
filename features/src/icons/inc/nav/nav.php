<?php

function add_search_form($item, $args)
{

    if (strpos($args->title, 'icon-') === 0) {
        $name = str_replace('icon-', '', $args->title);
        $url = $args->url;
        $svg = Ku_SVG_Icons::get_svg($name, 'social', false);
        $item = "<a href='$url'>$svg</a>";
    }

    return $item;
}
add_filter('walker_nav_menu_start_el', 'add_search_form', 10, 2);
