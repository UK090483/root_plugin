<?php

require 'inc/ParseDate.php';

class EventBlock
{
    function __construct()
    {
        add_action('init', array($this, 'register'));
    }
    public function register()
    {
        register_block_type(
            'kuevents/events',
            array(
                // Enqueue blocks.style.build.css on both frontend & backend.
                'style' => 'event_blocks-cgb-style-css',
                // Enqueue blocks.build.js in the editor only.
                'editor_script' => 'event_blocks-cgb-block-js',
                // Enqueue blocks.editor.build.css in the editor only.
                'editor_style' => 'event_blocks-cgb-block-editor-css',

                'render_callback' => array($this, 'kuevents_block_render'),
                'attributes' => array(

                    'showNext' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'showNextquantity' => array(
                        'type' => 'number',
                        'default' => -1
                    ),
                    'showOld' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'showOldquantity' => array(
                        'type' => 'number',
                        'default' => -1
                    ),
                ),
            )
        );
    }

    public function kuevents_block_render($attributes, $posts)
    {
        extract($attributes);


        $query =
            [
                'meta_key' => 'kubase_event_start_date',
                'post_type' => 'event',
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'orderby' => 'meta_value',
                'meta_type' => 'DATE',
                'order' => 'ASC',
            ];

        if (!$showNext) {
            $query =  array_merge($query, array(
                'meta_value'   => date("Y-m-d\TH:i:s"),
                'meta_compare' => '<',
            ));
        }

        if (!$showOld) {
            $query =  array_merge($query, array(
                'meta_value'   => date("Y-m-d\TH:i:s"),
                'meta_compare' => '>',
            ));
        }

        if (!$showOld && !$showNext) {
            return '<h1>No Posts</h1>';
        }

        $the_query = new WP_Query($query);


        $this->addMetaAndOrderQuery($the_query, $showNextquantity, $showOldquantity);



        ob_start();
        if ($the_query->have_posts()) {
            echo "<div class='ku_events_wrap'>";
            while ($the_query->have_posts()) {
                $this->getEvent($the_query);
            }
            echo '</div>';
        } else {
            echo 'no posts';
        }
        wp_reset_postdata();
        return ob_get_clean();
    }
    function getEvent($the_query)
    {

        $the_query->the_post();
        global $post;
        $meta = $post->meta;
        $Date = new ParseDate($meta['kubase_event_start_date'][0], $meta['kubase_event_end_date'][0]);
        $now = new DateTime('NOW');
        $old = new DateTime($meta['kubase_event_start_date'][0]) < $now ? 'ku_event_wrap_old' : '';
        $link = $meta['kubase_event_link'][0];


        echo "<div class='ku_event_wrap  $old'>" ?>
        <div class="ku_event_info">
            <div class="ku_event_info_item ku_event_info_date"><?php echo $Date->getDate() ?></div>
            <div class="ku_event_info_item ku_event_info_title"><?php the_title(); ?></div>
            <div class="ku_event_info_item ku_event_info_venue"><?php echo $meta['kubase_event_venue'][0] ?></div>
            <div class="ku_event_info_item ku_event_info_city"><?php echo $meta['kubase_event_city'][0] ?></div>
            <div class="ku_event_info_item ku_event_info_link"> <?php echo $link  ?  "<a href= $link rel='noopener' target='_blank'>More ➔</a>" : '' ?> </div>
        </div>
        </div>
<?php
    }
    function addMetaAndOrderQuery($query, $sizeNow, $sizeOld)
    {
        $posts =  $query->posts;
        $oldPosts = [];
        foreach ($posts as $key => $post) {
            $post->meta = get_post_meta($post->ID);

            if ($this->isOld($post->meta['kubase_event_start_date'][0])) {
                unset($posts[$key]);
                $oldPosts[] = $post;
            };
        }
        array_reverse($oldPosts);
        if ((int) $sizeNow !== -1) {
            array_splice($posts,  $sizeNow);
        }
        if ((int) $sizeOld !== -1) {
            array_splice($oldPosts,  $sizeOld);
        }
        $res = array_merge($posts, $oldPosts);
        $query->post_count = count($res);
        $query->posts = $res;
    }

    function isOld($date)
    {
        return new DateTime($date) < new DateTime('NOW');
    }
}

$Eventblock = new EventBlock();
