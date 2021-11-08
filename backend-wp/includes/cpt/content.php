<?php

/**
 * Creates a new custom post type: Contents
 *
 * @since 	1.0.0
 * @access 	public
 * @uses 	register_post_type()
 */

function new_cpt_contents()
{
  $cap_type   = 'post';
  $plural   = 'Contents';
  $single   = 'Content';
  $cpt_name   = 'content';

  $opts['can_export']                = TRUE;
  $opts['capability_type']            = $cap_type;
  $opts['description']              = '';
  $opts['exclude_from_search']          = FALSE;
  $opts['has_archive']              = esc_html__(strtolower($plural), 'charco');
  $opts['hierarchical']              = FALSE;
  $opts['map_meta_cap']              = TRUE;
  $opts['menu_icon']                = 'dashicons-format-aside';
  $opts['menu_position']              = 20;
  $opts['public']                  = TRUE;
  $opts['publicly_querable']            = FALSE;
  $opts['query_var']                = FALSE;
  $opts['register_meta_box_cb']          = '';
  $opts['rewrite']                = FALSE;
  $opts['show_in_admin_bar']            = TRUE;
  $opts['show_in_menu']              = TRUE;
  $opts['show_in_nav_menu']            = TRUE;
  $opts['show_in_rest']            = TRUE;
  $opts['rest_base']            = strtolower($plural);
  $opts['show_ui']                = TRUE;
  $opts['supports']                = array('title', 'editor', 'thumbnail');
  $opts['taxonomies']                = array('category', 'deliverables');

  $opts['capabilities']['delete_others_posts']  = "delete_others_{$cap_type}s";
  $opts['capabilities']['delete_post']      = "delete_{$cap_type}";
  $opts['capabilities']['delete_posts']      = "delete_{$cap_type}s";
  $opts['capabilities']['delete_private_posts']  = "delete_private_{$cap_type}s";
  $opts['capabilities']['delete_published_posts']  = "delete_published_{$cap_type}s";
  $opts['capabilities']['edit_others_posts']    = "edit_others_{$cap_type}s";
  $opts['capabilities']['edit_post']        = "edit_{$cap_type}";
  $opts['capabilities']['edit_posts']        = "edit_{$cap_type}s";
  $opts['capabilities']['edit_private_posts']    = "edit_private_{$cap_type}s";
  $opts['capabilities']['edit_published_posts']  = "edit_published_{$cap_type}s";
  $opts['capabilities']['publish_posts']      = "publish_{$cap_type}s";
  $opts['capabilities']['read_post']        = "read_{$cap_type}";
  $opts['capabilities']['read_private_posts']    = "read_private_{$cap_type}s";

  $opts['labels']['add_new']            = esc_html__("Add New {$single}", 'charco');
  $opts['labels']['add_new_item']          = esc_html__("Add New {$single}", 'charco');
  $opts['labels']['all_items']          = esc_html__($plural, 'charco');
  $opts['labels']['edit_item']          = esc_html__("Edit {$single}", 'charco');
  $opts['labels']['menu_name']          = esc_html__($plural, 'charco');
  $opts['labels']['name']              = esc_html__($plural, 'charco');
  $opts['labels']['name_admin_bar']        = esc_html__($single, 'charco');
  $opts['labels']['new_item']            = esc_html__("New {$single}", 'charco');
  $opts['labels']['not_found']          = esc_html__("No {$plural} Found", 'charco');
  $opts['labels']['not_found_in_trash']      = esc_html__("No {$plural} Found in Trash", 'charco');
  $opts['labels']['parent_item_colon']      = esc_html__("Parent {$plural} :", 'charco');
  $opts['labels']['search_items']          = esc_html__("Search {$plural}", 'charco');
  $opts['labels']['singular_name']        = esc_html__($single, 'charco');
  $opts['labels']['view_item']          = esc_html__("View {$single}", 'charco');

  $opts['rewrite']['ep_mask']            = EP_PERMALINK;
  $opts['rewrite']['feeds']            = FALSE;
  $opts['rewrite']['pages']            = FALSE;
  $opts['rewrite']['slug']            = esc_html__(strtolower($single), 'charco');
  $opts['rewrite']['with_front']          = FALSE;

  $opts = apply_filters('charco-cpt-options', $opts);

  register_post_type(strtolower($cpt_name), $opts);
} // new_cpt_contents()

add_action('init', 'new_cpt_contents');