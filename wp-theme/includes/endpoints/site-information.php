<?php

	/**
	 * Creates a new endpoint
	 *
	 * @since 	1.0.0
	 * @access 	public
	 * @uses 	logo_general_section()
	 */
  
function add_ch_endpoints() {

  register_rest_route( 'wp/v2', 'site-settings', array(
    'methods' => WP_REST_Server::ALLMETHODS,
    'callback' =>  'ch_get_info_site'
  ));

  register_rest_route( 'wp/v2', 'footer', array(
    'methods' => WP_REST_Server::ALLMETHODS,
    'callback' =>  'ch_get_widget'
  ));
}

add_action( 'rest_api_init', 'add_ch_endpoints');
  
  
function ch_get_info_site()
{
  return array(
    'logo_id' => get_option('logo_img_id'),
    'logo_src' => wp_get_attachment_image_src( intval(esc_attr(get_option('logo_img_id'))), 'full' )[0] ,
    'title' => get_bloginfo('name'),
    'description' => get_bloginfo('description')
  );
}
  
  
function ch_get_widget()
{
  ob_start();
	dynamic_sidebar('footer-column-1');
	$footer_1 = ob_get_contents();
  ob_end_clean();	
  
  ob_start();
	dynamic_sidebar('footer-column-2');
	$footer_2 = ob_get_contents();
  ob_end_clean();	
  
  ob_start();
	dynamic_sidebar('footer-column-3');
	$footer_3 = ob_get_contents();
  ob_end_clean();	
  
  return array(
    'footer_1' => array(
      'title' => '',
      'rendered' => $footer_1
    ),
    'footer_2' => array(
      'title' => '',
      'rendered' => $footer_2
    ),
    'footer_3' => array(
      'title' => '',
      'rendered' => $footer_3
    )
  );
}