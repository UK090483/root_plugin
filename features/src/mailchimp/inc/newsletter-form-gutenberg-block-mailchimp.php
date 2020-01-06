<?php
/*
Plugin Name: Newsletter Form for Gutenberg Powered by Mailchimp
Description: Simple, no-nonsense Mailchimp form block for Gutenberg editor.
Author: WebFactory Ltd
Version: 1.02
Author URI: https://www.webfactoryltd.com/

  Copyright 2018  Web factory Ltd  (email : support@webfactoryltd.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

//  Exit if accessed directly.
defined('ABSPATH') || exit;

if (!class_exists('DrewM\MailChimp')) {
  require_once dirname(__FILE__) . '/mailchimp-api.php';
}

class wf_mailchimp_block
{
  static $version;

  // get plugin version from header
  static function get_plugin_version()
  {
    $plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');
    self::$version = $plugin_data['version'];
    return $plugin_data['version'];
  } // get_plugin_version


  // hook things up
  static function init()
  {
    if (is_admin()) {
      if (false === self::check_gutenberg()) {
        error_log('not Gutenberg');
        return false;
      }
      add_filter('plugin_row_meta', array(__CLASS__, 'plugin_meta_links'), 10, 2);
      add_action('wp_ajax_wf_mailchimp_block_submit_form', array(__CLASS__, 'submit_form'));
      add_action('wp_ajax_nopriv_wf_mailchimp_block_submit_form', array(__CLASS__, 'submit_form'));
    }
  } // init

  static function add_nonce($block_content, $block)
  {

    if ($block['blockName'] === 'webfactory/mailchimp') {
      preg_match_all("/<[^>]*>/", $block_content, $output);
      $nouncefield = wp_nonce_field('name_of_my_action', 'name_of_nonce_field');
      array_splice($output[0], 2, 0, $nouncefield);
      $block_content = implode($output[0]);
    };
    return $block_content;
  }

  static function checkApiKey($key)
  {
    if ($key) {
      try {
        $mc = new DrewM\MailChimp($key);
        $raw_lists = $mc->get('');
        if ($mc->success()) {
          wp_send_json_success($raw_lists);
        } else {
          wp_send_json_error('something went wrong');
        }
      } catch (Exception $e) {
        wp_send_json_error('Invalid API key.');
      }
      wp_send_json($key, 1);
    } else {
      wp_send_json($_POST);
    };
  }

  static function submit_form()
  {
    if ($_POST['payload'] === 'checkKey') {
      self::checkApiKey($_POST['api_key']);
    }
    if ($_POST['payload'] === 'submit') {
      self::submit();
    }
    die();
  } // submit_form

  static function submit()
  {
    $key = self::getApiKey($_POST['post_id']);

    $fields = array();
    if (empty($_POST['email']) || !is_email($_POST['email']) || empty($_POST['name']) || !preg_match("/^[a-zA-Z ]*$/", $_POST['name'])) {
      wp_send_json_error(4);
    }
    try {
      $mc = new DrewM\MailChimp($key);
    } catch (Exception $e) {
      wp_send_json_error('blaaaa');
    }
    $options = get_option('wf-mailchimp-block');
    $list = $options['list'];
    $email = sanitize_email($_POST['email']);
    $name = sanitize_text_field($_POST['name']);
    $member_info = $mc->get('search-members', array('list_id' => $list, 'query' => $email));


    if (isset($member_info['exact_matches']) && $member_info['exact_matches']['total_items'] == 0) {
      $status = 'pending';
      $res = $mc->post('lists/' . $list . '/members', array('email_address' => $email, 'status' => $status, 'merge_fields' => array('FNAME' => $name)));

      if ($mc->success()) {

        wp_send_json_success($res);
        // wp_send_json_success(1);
      } else {
        wp_send_json_error(2);
      }
    } else {
      wp_send_json_error(3);
    }
  }


  static function getApiKey($post_id)
  {

    $post = get_post($post_id);
    $blocks = parse_blocks($post->post_content);
    foreach ($blocks as $block) {
      if ('webfactory/mailchimp' === $block['blockName']) {
        if (isset($block['attrs']['api_key'])) {
          return $block['attrs']['api_key'];
        } else {
          return false;
        }
        break;
      }
    }
    return false;
  }

  // some things have to be loaded earlier
  static function plugins_loaded()
  {
    self::$version = self::get_plugin_version();
  } // plugins_loaded


  // add links to plugin's description in plugins table
  static function plugin_meta_links($links, $file)
  {
    $support_link = '<a target="_blank" href="https://wordpress.org/support/plugin/mailchimp-block-gutenberg" title="' . __('Problems? We are here to help!', 'mailchimp-block-gutenberg') . '">' . __('Support', 'mailchimp-block-gutenberg') . '</a>';
    $review_link = '<a target="_blank" href="https://wordpress.org/support/view/plugin-reviews/mailchimp-block-gutenberg?filter=5#pages" title="' . __('If you like it, please review the plugin', 'mailchimp-block-gutenberg') . '">' . __('Review the plugin', 'mailchimp-block-gutenberg') . '</a>';

    if ($file == plugin_basename(__FILE__)) {
      $links[] = $support_link;
      $links[] = $review_link;
    }
    return $links;
  } // plugin_meta_links

  // check if Gutenberg is available
  static function check_gutenberg()
  {
    if (false === defined('GUTENBERG_VERSION') && false === version_compare(get_bloginfo('version'), '4.9.9', '>')) {
      add_action('admin_notices', array(__CLASS__, 'notice_gutenberg_missing'));
      return false;
    }
  } // check_gutenberg


  // complain if Gutenberg is not available
  static function notice_gutenberg_missing()
  {
    echo '<div class="error"><p><b>Mailchimp Block</b> plugin requires Gutenberg editor to work. It is after all a block for Gutenberg ;)<br>Install the <a href="' . admin_url('plugin-install.php?s=gutenberg&tab=search&type=term') . '">Gutenberg plugin</a> and this notice will go away. Or update to WordPress v5.0.</p></div>';
  } // notice_gutenberg_missing
} // class wf_mailchimp_block


// get the party started
add_action('init', array('wf_mailchimp_block', 'init'));
add_action('plugins_loaded', array('wf_mailchimp_block', 'plugins_loaded'));
add_filter('render_block', array('wf_mailchimp_block', 'add_nonce'), 10, 2);
