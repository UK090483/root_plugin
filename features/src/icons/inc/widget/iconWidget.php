<?php

/**
 * Adds Ku_base_icon_Widget widget.
 */
class Ku_base_icon_Widget extends WP_Widget
{

    /**
     * Register widget with WordPress.
     */
    public function __construct()
    {
        parent::__construct(
            'Ku_base_icon_widget', // Base ID
            'Ku_base_icon_Widget', // Name
            array('description' => __('A Ku_base_icon Widget', 'text_domain'),) // Args
        );
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget($args, $instance)
    {
        $icons = Ku_SVG_Icons::$social_icons;

        // $title = apply_filters('widget_title', $instance['title']);
        $color = '#111111';
        if (isset($instance['color'])) {
            $color = $instance['color'];
            unset($instance['color']);
        }
        $align = 'flex-start';
        if (isset($instance['align'])) {
            $align = $instance['align'];
            unset($instance['align']);
        }
        $size = '54';
        if (isset($instance['size'])) {
            $size = $instance['size'];
            unset($instance['size']);
        }
        $margin = '54%';
        if (isset($instance['margin'])) {
            $margin = $instance['margin'] . '%';
            unset($instance['margin']);
        }
        $marginTb = '20px';
        if (isset($instance['marginTb'])) {
            $marginTb = $instance['marginTb'] . 'px';
            unset($instance['marginTb']);
        }

        $computetMargin = $align == 'flex-start' ? "margin: $marginTb auto $marginTb 0 ;" : ($align == 'center' ? "margin: $marginTb auto $marginTb auto;" : "margin:$marginTb 0 $marginTb  auto;");

        echo $args['before_widget'];
        echo "<div style='width: $margin; min-width:300px ; display:flex; align-items:center; justify-content: space-between; $computetMargin '>";
        foreach ($instance as $key => $value) {
            if (isset($icons[$key])) {
                echo "<a href=$value  >" . Ku_SVG_Icons::get_svg($key, 'social', $color, $size) . '</a>';
            }
        }
        echo '</div>';
        echo $args['after_widget'];
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form($instance)
    {

        $icons = Ku_SVG_Icons::$social_icons;


?>


        <div style='width:100%; height:200px; overflow:scroll'>
            <?php
            foreach ($icons as $key => $value) {
            ?>
                <div style='width:100%; height:30px; display:flex; align-items:center; justify-content: space-between'>
                    <div class='ku_icon_icon' style='width:30px; height:30px;' data-name=$key>
                        <div style=' pointer-events: none;'><?php echo $value ?></div>
                    </div>
                    <label for="<?php echo $this->get_field_name($key); ?>"><?php echo $key ?></label>
                    <input style='width: 50%; height:30px;' id="<?php echo $this->get_field_id($key); ?>" name="<?php echo  $this->get_field_name($key); ?>" type="text" value="<?php echo isset($instance[$key]) ? $instance[$key] : ''; ?>" />
                </div>
            <?php

            }
            ?>
        </div>
        <?php

        ?>
        <p>
            <label for="<?php echo $this->get_field_name('color'); ?>"><?php _e('color'); ?></label>
            <input class=" widefat" id="<?php echo $this->get_field_id('color'); ?>" name="<?php echo $this->get_field_name('color'); ?>" type="text" value="<?php echo esc_attr(isset($instance['color']) ? $instance['color'] : '#111111');  ?>" />
            <label for="<?php echo $this->get_field_name('color'); ?>"><?php _e('color'); ?></label>
            <input class=" widefat" id="<?php echo $this->get_field_id('color'); ?>" name="<?php echo $this->get_field_name('color'); ?>" type="color" value="<?php echo esc_attr(isset($instance['color']) ? $instance['color'] : '#111111'); ?>" />
            <label class=" widefat" for="<?php echo $this->get_field_name('size'); ?>"><?php _e('size'); ?></label>
            <input class=" widefat" id="<?php echo $this->get_field_id('size'); ?>" name="<?php echo $this->get_field_name('size'); ?>" type="range" min="10" max="100" value="<?php echo esc_attr(isset($instance['size']) ? $instance['size'] : '24'); ?>" />
            <label class=" widefat" for="<?php echo $this->get_field_name('margin'); ?>"><?php _e('margin'); ?></label>
            <input class=" widefat" id="<?php echo $this->get_field_id('margin'); ?>" name="<?php echo $this->get_field_name('margin'); ?>" type="range" min="10" max="100" value="<?php echo esc_attr(isset($instance['margin']) ? $instance['margin'] : '24'); ?>" />
            <label class=" widefat" for="<?php echo $this->get_field_name('marginTb'); ?>"><?php _e('marginTb'); ?></label>
            <input class=" widefat" id="<?php echo $this->get_field_id('marginTb'); ?>" name="<?php echo $this->get_field_name('marginTb'); ?>" type="range" min="10" max="100" value="<?php echo esc_attr(isset($instance['marginTb']) ? $instance['margin'] : '24'); ?>" />

    <?php

        if (!function_exists('ku_checked')) {
            function ku_checked($v, $instance, $self)
            {
                $active = 'left';
                if (isset($instance['align'])) {
                    $active = $instance['align'];
                }
                $field_id = $self->get_field_id('align');
                $field_name = $self->get_field_name('align');

                echo "<div style='width:100%; display:flex; align-items:center '>";
                foreach ($v as $key => $value) {

                    if ($active == $key) {
                        echo   "<input id='$field_id' type='radio' name='$field_name'checked value='$key'><div style='width:100%;'>$value</div><br>";
                    } else {
                        echo   "<input id='$field_id' type='radio' name='$field_name' value='$key'><div style='width:100%;'>$value</div><br>";
                    }
                }
                echo '</div>';
            }
        }

        ku_checked(array('flex-start' => 'Left', 'center' => 'Center', 'flex-end' => 'Right'), $instance, $this);


        // error_log(print_r($instance, true));
    }
    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update($new_instance, $old_instance)
    {
        // error_log(print_r($new_instance, true));

        $instance = array();

        if (isset($new_instance['color'])) {
            $instance['color'] = $new_instance['color'];
            unset($new_instance['color']);
        }
        if (isset($new_instance['align'])) {
            $instance['align'] = $new_instance['align'];
            unset($new_instance['align']);
        }
        if (isset($new_instance['size'])) {
            $instance['size'] = $new_instance['size'];
            unset($new_instance['size']);
        }
        if (isset($new_instance['margin'])) {
            $instance['margin'] = $new_instance['margin'];
            unset($new_instance['margin']);
        }
        if (isset($new_instance['marginTb'])) {
            $instance['marginTb'] = $new_instance['marginTb'];
            unset($new_instance['marginTb']);
        }
        foreach ($new_instance as $key => $value) {
            if ($value === '') {
            } else {
                $instance[$key] = strip_tags($value);
            }
        }
        return $instance;
    }
} // class Ku_base_icon_Widget

add_action('widgets_init', 'register_Ku_base_icon');

function register_Ku_base_icon()
{
    register_widget('Ku_base_icon_Widget');
}

// Only enqueue scripts & style on necessary pages 

function my_enqueue_scripts($hook)
{
    error_log(plugins_url('widget/icon-widget.js', dirname(__FILE__)));
    if ('widgets.php' != $hook) return;
    wp_enqueue_script('widget-js', plugins_url('widget/icon-widget.js', dirname(__FILE__)));
    wp_enqueue_style('iwdget-css');
}
add_action('admin_enqueue_scripts', 'my_enqueue_scripts');
