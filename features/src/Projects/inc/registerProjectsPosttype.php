<?php


function kubase_registerProjectsPostTypes()
{
    register_post_type(
        'project',
        array(
            'labels' => array(
                'name' => 'Projects',
                'singular_name' => 'Project',
                'menu_name' => 'Projects',
                'name_admin_bar' => 'Projects',
                'archives' => 'Projects' . ' Archives',
                'attributes'            => 'Projects' . ' Attributes',
                'parent_item_colon'     =>  'parent ' . 'Projects',
                'all_items'             => 'All ' . 'Projects',
                'add_new_item' => 'Add New ' . 'Project',
                'add_new'               => 'Add New ' . 'Project',
                'new_item' =>  'New' . 'Project',
                'edit_item'             => 'Edit' . 'Project',
                'update_item'           => 'Update ' . 'Project',
                'view_item'             => 'View ' . 'Project',
                'view_items'            =>  'View ' . 'Projects',
                'search_items'          =>  'Search ' . 'Project',
                'not_found'             =>  'Project' . ' Not Found',
                'not_found_in_trash'    => 'Project' . ' Not Found In Trash',
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

            'label' => 'Projects',
            'description' => 'Projects' . 'Custom Post Type',
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
            'rest_base' => 'project',
        )
    );
}

add_post_type_support('project', array('thumbnail', 'excerpt', 'custom-fields'));
add_action('init',  'kubase_registerProjectsPostTypes');
