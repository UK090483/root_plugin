<?php

/**
 * Plugin Name: Sarah

 * Description: Plugin for Sarah
 * Author: Konrad Ullrich
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}



/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . '/features/src/init.php';



// add_action('rest_api_init', 'mgku_create_api_artist_thumbnail');

// function mgku_create_api_artist_thumbnail()
// {

//     // register_rest_field ( 'name-of-post-type', 'name-of-field-to-return', array-of-callbacks-and-schema() )
//     register_rest_field(
//         'artist',
//         'thumbnail',
//         array(
//             'get_callback' => 'mgku_get_post_meta_for_api',
//             'schema' => null,
//         )
//     );
// }
// function mgku_get_post_meta_for_api($object)
// {
//     //get the id of the post object array
//     $post_id = $object['id'];
//     //return the post meta
//     return get_the_post_thumbnail_url($post_id);
// }

// add_action('rest_api_init', 'mgku_create_api_ausstellungen_thumbnail');

// function mgku_create_api_ausstellungen_thumbnail()
// {
//     register_rest_field(
//         'ausstellungen',
//         'thumbnail',
//         array(
//             'get_callback' => 'mgku_get_thumbnail_ausstellungen',
//             'schema' => null,
//         )
//     );
// }
// function mgku_get_thumbnail_ausstellungen($object)
// {
//     //get the id of the post object array
//     $post_id = $object['id'];

//     //return the post meta
//     return get_the_post_thumbnail_url($post_id);
// }
