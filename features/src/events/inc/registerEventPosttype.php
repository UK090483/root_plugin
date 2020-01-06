<?php


function kubase_registerArtistsPostTypes()
{
    register_post_type(
        'event',
        array(
            'labels' => array(
                'name' => 'Events',
                'singular_name' => 'Event',
                'menu_name' => 'Events',
                'name_admin_bar' => 'Events',
                'archives' => 'Events' . ' Archives',
                'attributes'            => 'Events' . ' Attributes',
                'parent_item_colon'     =>  'parent ' . 'Events',
                'all_items'             => 'All ' . 'Events',
                'add_new_item' => 'Add New ' . 'Event',
                'add_new'               => 'Add New ' . 'Event',
                'new_item' =>  'New' . 'Event',
                'edit_item'             => 'Edit' . 'Event',
                'update_item'           => 'Update ' . 'Event',
                'view_item'             => 'View ' . 'Event',
                'view_items'            =>  'View ' . 'Events',
                'search_items'          =>  'Search ' . 'Event',
                'not_found'             =>  'Event' . ' Not Found',
                'not_found_in_trash'    => 'Event' . ' Not Found In Trash',
                // 'featured_image'        => $post_type['featured_image'] || 'Featured Image',
                // 'set_featured_image'    => $post_type['set_featured_image'] || 'Set Featured Image',
                // 'remove_featured_image' => $post_type['remove_featured_image'] || 'Remove Featured Image',
                // 'use_featured_image'    => $post_type['use_featured_image'] || 'Use Featured Image',
                // 'insert_into_item'      => $post_type['insert_into_item'] || 'Insert into' . $post_type['name'],
                // 'uploaded_to_this_item' => $post_type['uploaded_to_this_item'] || 'Upload to' . $post_type['name'],,
                // 'items_list'            => $post_type['items_list'] || 'Insert into' . $post_type['name'],,
                // 'items_list_navigation' => $post_type['items_list_navigation'] || $post_type['name'] . 'List',
                // 'filter_items_list'     => $post_type['filter_items_list'] || 'Filter' . $post_type['name'] . 'List',
            ),

            'label' => 'Events',
            'description' => 'Events' . 'Custom Post Type',

            // 'supports' => array('thumbnail,editor'),
            'show_in_rest' => true,
            // 'taxonomies' => isset($post_type['taxonomies']) ? $post_type['taxonomies'] : array(),
            'hierarchical' => false,
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 110,
            'show_in_admin_bar' => true,
            'show_in_nav_menus' => true,
            'can_export' => true,
            'has_archive' => true,
            'exclude_from_search' => false,
            'publicly_queryable' => true,
            'capability_type' => 'post',
            'rest_base' => 'events',
        )
    );

    $post_type_object = get_post_type_object('event');
    $post_type_object->template = array(
        array('kuevents/events-date'),
        array('kuevents/events-ui'),
        array('kuevents/event-description'),


    );
    $post_type_object->template_lock = 'all';
}

add_post_type_support('event', array('editor', 'custom-fields'));
add_action('init',  'kubase_registerArtistsPostTypes');
