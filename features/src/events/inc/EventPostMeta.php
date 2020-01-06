<?php



function kubase_register_date_post_meta()
{

    register_post_meta('event', 'kubase_event_start_date', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_end_date', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_description', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_mediaId', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ));
    register_post_meta('event', 'kubase_event_mediaUrl', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_city', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_venue', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
    register_post_meta('event', 'kubase_event_link', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
}

add_action('init', 'kubase_register_date_post_meta');
