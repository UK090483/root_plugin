<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

require plugin_dir_path(__FILE__) . 'mailchimp/mailchimp.php';
require plugin_dir_path(__FILE__) . 'events/events.php';




function my_block_cgb_block_assets()
{ // phpcs:ignore
    // Register block styles for both frontend + backend.
    wp_register_style(
        'my_block-cgb-style-css', // Handle.
        plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
        array('wp-editor'), // Dependency to include the CSS after it.
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
    );

    // Register block editor script for backend.
    $wf_mailchimp_block = array(
        'api_key' => isset($options['api_key']) ? $options['api_key'] : '',
        'mc_list' => isset($options['list']) ? $options['list'] : '',
        'mc_lists' => !empty($options['lists']) ? $options['lists'] : array((object) array('label' => 'No Lists Found', 'value' => '-1')),
        '_description' => __('Simple yet powerfull Mailchimp subscribe form.', 'mailchimp-block-gutenberg'),
        '_mailchimp' => __('Mailchimp Form', 'mailchimp-block-gutenberg'),
        '_mailchimp_lc' => __('mailchimp', 'mailchimp-block-gutenberg'),
        '_mc_list' => __('List', 'mailchimp-block-gutenberg'),
        '_form_css' => __('Form Style', 'mailchimp-block-gutenberg'),
        '_email_field_label' => __('Email Field Label', 'mailchimp-block-gutenberg'),
        '_name_field_label' => __('Name Field Label', 'mailchimp-block-gutenberg'),
        '_submit_field_label' => __('Submit Button Label', 'mailchimp-block-gutenberg'),
        '_success_message' => __('Success Message', 'mailchimp-block-gutenberg'),
        '_error_message' => __('Error Message', 'mailchimp-block-gutenberg'),
        '_submit_message' => __('Submit Error Message', 'mailchimp-block-gutenberg'),
        '_duplicate_message' => __('Duplicate Message', 'mailchimp-block-gutenberg'),
        '_api_key' => __('API Key', 'mailchimp-block-gutenberg'),
        '_api_info_start' => __('Open your', 'mailchimp-block-gutenberg'),
        '_api_info_console' => __('MailChimp account', 'mailchimp-block-gutenberg'),
        '_api_info_end' => __('to get an API Key.', 'mailchimp-block-gutenberg')
    );


    wp_register_script(
        'my_block-cgb-block-js', // Handle.
        plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-hooks', 'wp-compose', 'lodash', 'wp-data'), // Dependencies, defined above.
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
        true // Enqueue the script in the footer.
    );

    wp_localize_script('my_block-cgb-block-js', 'wf_mailchimp_block', $wf_mailchimp_block);
    // Register block editor styles for backend.
    wp_register_style(
        'my_block-cgb-block-editor-css', // Handle.
        plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
        array('wp-edit-blocks'), // Dependency to include the CSS after it.
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
    );

    /**
     * Register Gutenberg block on server-side.
     *
     * Register the block on server-side to ensure that the block
     * scripts and styles for both frontend and backend are
     * enqueued when the editor loads.
     *
     * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
     * @since 1.16.0
     */

    register_meta('post', 'featured_image_focalpoint', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));


    require  'show-posts/serverside/PostsBlock.php';
    $postBlock = new PostsBlock();
    $postBlock->register();

    require  'hero2/serverside/HeroBlock.php';
    $heroBlock = new HeroBlock();
    $heroBlock->register();
}


// Hook: Block assets.
add_action('init', 'my_block_cgb_block_assets');






function melikes_block_category($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'kubase-blocks',
                'title' => 'KUBase Blocks'
            ),
        )
    );
}

add_filter('block_categories', 'melikes_block_category', 10, 2);



function melike_gallery_plugin_scripts()
{
    wp_register_script('ku-block-frontend', plugins_url('dist/blocks.frontend.js', dirname(__FILE__)), array(),  '1.1', true);

    $wf_mailchimp_block = array('ajaxurl' => admin_url('admin-ajax.php'));

    wp_localize_script('ku-block-frontend', 'ku_block', $wf_mailchimp_block);
    // wp_enqueue_script('blocks-main-js', plugin_dir_url(__FILE__) . '/blocksmain.js', array(), '1.1', true);
    wp_enqueue_script('ku-block-frontend');
}

add_action('enqueue_block_assets', 'melike_gallery_plugin_scripts');
