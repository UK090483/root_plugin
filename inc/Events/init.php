<?php

require_once plugin_dir_path(__FILE__) . 'inc/registerEventPosttype.php';
require_once plugin_dir_path(__FILE__) . 'inc/EventsController.php';
require_once plugin_dir_path(__FILE__) . 'inc/EventPostMeta.php';

require_once plugin_dir_path(__FILE__) . 'inc/hidePreviewButton.php';
require_once plugin_dir_path(__FILE__) . 'my-block/plugin.php';


function Event_block_category($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'event-blocks',
                'title' => 'Event Blocks'
            ),
        )
    );
}

add_filter('block_categories', 'Event_block_category', 10, 2);
