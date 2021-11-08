<?php

/**
 * Creates a new options in General Options
 *
 * @since 	1.0.0
 * @access 	public
 * @uses 	logo_general_section()
 */

add_action('admin_init', 'logo_general_section');
function logo_general_section()
{

  add_settings_section(
    'logo_section', // Section ID 
    'Logotipo', // Section Title
    'logo_section_callback', // Callback
    'general' // What Page?  This makes the section show up on the General Settings Page
  );

  add_settings_field( // Option 1
    'logo_img_id', // Option ID
    'Logo', // Label
    'media_upload_callback', // !important - This is where the args go!
    'general', // Page it will be displayed (General Settings)
    'logo_section', // Name of our section
    array( // The $args
      'logo_img_id' // Should match Option ID
    )
  );

  register_setting('general', 'logo_img_id', 'esc_attr');
}

function logo_section_callback()
{ // Section Callback
  echo '<p>Change the logo</p>';
}

function media_upload_callback($args)
{  // Textbox Callback

  $field = $args[0];
  $image_id = esc_attr(get_option($field));

  if ($image = wp_get_attachment_image_src($image_id)) {
    echo '<a href="#" class="ch-upl-img"><img src="' . $image[0] . '" /></a>
				  <a href="#" class="ch-rmv-img">Remove logo</a>
				  <input type="hidden" class="img-val" name="' . $field . '" value="' . $image_id . '">';
  } else {
    echo '<a href="#" class="ch-upl-img">Upload logo</a>
				  <a href="#" class="ch-rmv-img" style="display:none">Remove logo</a>
				  <input type="hidden" class="ch-val" name="' . $field . '" value="">';
  }
}

add_action('admin_enqueue_scripts', 'load_logo_scripts');
function load_logo_scripts()
{
  // Enqueue js
  wp_enqueue_media();
  wp_enqueue_script(
    'mediaupload-logo',
    CH_THEME_URI . '/assets/js/admin/ch-media-upload.js',
    array('jquery'),
    '1.0',
    true
  );
}
