<?php

/**
 * Creates a new taxonomies
 *
 * @since 	1.0.0
 * @access 	public
 * @uses 	register_post_type()
 */

function themes_taxonomy()
{
  register_taxonomy(
    'deliverables', 
    'work',
    array(
      'labels' => array(
        'name' => 'Deliverables',
        'singular_name' => 'Deliverable',
        'menu_name' => 'Deliverables',
        'search_items' => __('Search', 'total'),
        'popular_items' => __('Popular', 'total'),
        'all_items' => __('All', 'total'),
        'parent_item' => __('Parent', 'total'),
        'parent_item_colon' => __('Parent', 'total'),
        'edit_item' => __('Edit', 'total'),
        'update_item' => __('Update', 'total'),
        'add_new_item' => __('Add New', 'total'),
        'new_item_name' => __('New', 'total'),
        'separate_items_with_commas' => __('Separate with commas', 'total'),
        'add_or_remove_items' => __('Add or remove', 'total'),
        'choose_from_most_used' => __('Choose from the most used', 'total'),
      ),
      'public' => true,
      'show_in_nav_menus' => true,
      'show_in_rest' => true,
      'has_archive' => true,
      'show_ui' => true,
      'show_admin_column' => true,
      'show_tagcloud' => true,
      'hierarchical' => true,
      'query_var' => true,
      'rewrite' => array(
        'slug' => 'deliverables',    // This controls the base slug that will display before each term
      )
    )
  );
}
add_action('init', 'themes_taxonomy');