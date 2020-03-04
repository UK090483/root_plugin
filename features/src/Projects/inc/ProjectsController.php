<?php


class ProjectsController
{
    public $custom_post_types = array();

    function __construct()
    {
        add_filter("manage_edit-project_columns", array($this, 'artists_edit_columns'));
        add_action("manage_posts_custom_column", array($this, 'artists_custom_columns'));
        add_theme_support('post-thumbnails', array('artists'));
    }

    public function artists_edit_columns($columns)
    {


        $new_columns = array(
            "cb" => "<input type=\"checkbox\" />",
            "title" => "Project",
            "ku_projects_thumb" => "Thumbnail",
            "date" => "published",
        );
        return array_merge($new_columns);
    }

    public function artists_custom_columns($column)
    {
        // global $post;
        $custom = get_post_custom();
        // $post->post_type;
        if (get_post_type() != 'project') {
            return;
        };

        switch ($column) {

            case "ku_projects_thumb":
                // - show thumb -
                $post_image_id = get_post_thumbnail_id(get_the_ID());
                if ($post_image_id) {
                    echo get_the_post_thumbnail(get_the_ID(), array(60, 60));
                }
                break;
            case "ku_projecte_desc";
                the_excerpt();
                break;
        }
    }
}

new ProjectsController();
