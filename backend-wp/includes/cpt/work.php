<?php

/**
 * Creates a new custom post type: Works
 *
 * @since 	1.0.0
 * @access 	public
 * @uses 	register_post_type()
 */

function new_cpt_works()
{
  $cap_type   = 'post';
  $plural   = 'Works';
  $single   = 'Work';
  $cpt_name   = 'work';

  $opts['can_export']                = TRUE;
  $opts['capability_type']            = $cap_type;
  $opts['description']              = '';
  $opts['exclude_from_search']          = FALSE;
  $opts['has_archive']              = esc_html__(strtolower($plural), 'charco');
  $opts['hierarchical']              = FALSE;
  $opts['map_meta_cap']              = TRUE;
  $opts['menu_icon']                = 'dashicons-images-alt2';
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
} // new_cpt_work()

add_action('init', 'new_cpt_works');


//Modify endpoint: Works
function add_related_works_to_work()
{
  register_rest_field(
    'work', //the post type of your choice
    'related_works', //the name for your json element
    array(
      'get_callback'    => 'related_works_return', //the function that creates the content 
    )
  );
}

add_action('rest_api_init', 'add_related_works_to_work');

// Return Related post
function related_works_return($object, $field_name, $request)
{
  global $post;
  $related = get_posts( array( 'category__in' => wp_get_post_categories($post->ID), 'numberposts' => 5, 'post__not_in' => array($post->ID) ) );

  //Get array of terms
  $terms = get_the_terms( $post->ID , 'category', 'string');
  //Pluck out the IDs to get an array of IDS
  $term_ids = wp_list_pluck($terms,'term_id');

  //Query posts with tax_query. Choose in 'IN' if want to query posts with any of the terms
  //Chose 'AND' if you want to query for posts with all terms
  $wp_query = new WP_Query( array(
      'post_type' => 'work',
      'tax_query' => array(
                    array(
                        'taxonomy' => 'category',
                        'field' => 'id',
                        'terms' => $term_ids,
                        'operator'=> 'IN' //Or 'AND' or 'NOT IN'
                     )),
      'posts_per_page' => 3,
      'ignore_sticky_posts' => 1,
      'orderby' => 'rand',
      'post__not_in'=>array($post->ID)
  ) );

  $ids_related = [];
  while ($wp_query->have_posts() ) : 
    
    $wp_query->the_post();
    $ids_related[] =  get_the_ID();;
   
  endwhile; 
  wp_reset_query();
  
  return $ids_related;

}
