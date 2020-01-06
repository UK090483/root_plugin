<?php


function kubase_registerArtistsPostTypes()
{
    register_post_type(
        'artist',
        array(
            'labels' => array(
                'name' => 'Artists',
                'singular_name' => 'Artist',
                'menu_name' => 'Artists',
                'name_admin_bar' => 'Artists',
                'archives' => 'Artists' . ' Archives',
                'attributes'            => 'Artists' . ' Attributes',
                'parent_item_colon'     =>  'parent ' . 'Artists',
                'all_items'             => 'All ' . 'Artists',
                'add_new_item' => 'Add New ' . 'Artist',
                'add_new'               => 'Add New ' . 'Artist',
                'new_item' =>  'New' . 'Artist',
                'edit_item'             => 'Edit' . 'Artist',
                'update_item'           => 'Update ' . 'Artist',
                'view_item'             => 'View ' . 'Artist',
                'view_items'            =>  'View ' . 'Artists',
                'search_items'          =>  'Search ' . 'Artist',
                'not_found'             =>  'Artist' . ' Not Found',
                'not_found_in_trash'    => 'Artist' . ' Not Found In Trash',
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

            'label' => 'Artists',
            'description' => 'Artists' . 'Custom Post Type',
            // 'supports' => array('thumbnail,editor'),
            'show_in_rest' => true,
            // 'taxonomies' => isset($post_type['taxonomies']) ? $post_type['taxonomies'] : array(),
            'hierarchical' => false,
            'public' => true,
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
            'rest_base' => 'artists',
        )
    );
}

add_post_type_support('artist', array('thumbnail', 'excerpt', 'custom-fields'));
add_action('init',  'kubase_registerArtistsPostTypes');
