<?php

/**
 * Child theme functions
 */

define('CH_THEME_DIR', get_stylesheet_directory());
define('CH_THEME_URI', get_stylesheet_directory_uri());
define('CH_VERSION', '0.0.1');

//CPT's
require_once CH_THEME_DIR . '/includes/cpt/work.php';
require_once CH_THEME_DIR . '/includes/cpt/content.php';

//Taxonomies
require_once CH_THEME_DIR . '/includes/taxonomies/deliverables.php';

// New options in settings
require_once CH_THEME_DIR . '/includes/options.php';

//Add new endpoints
require_once CH_THEME_DIR . '/includes/endpoints/site-information.php';

//New Gutenbergs Blocks
require_once CH_THEME_DIR . '/blocks/index.php';

add_action('after_setup_theme', 'charco_setup');
function charco_setup()
{
  load_theme_textdomain('Charco', get_template_directory() . '/languages');
  add_theme_support('title-tag');
  add_theme_support('automatic-feed-links');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array(
    'search-form'
  ));

  global $content_width;
  if (!isset($content_width)) {
    $content_width = 1920;
  }
  register_nav_menus(array(
    'main-menu' => esc_html__('Main Menu', 'Charco')
  ));
}

add_action('widgets_init', 'charco_widgets_init');
function charco_widgets_init()
{

  register_sidebar(array(
    'name' => __('Footer - Column 1', 'tutsplus'),
    'id' => 'footer-column-1',
    'description' => __('The first footer widget area', 'Charco'),
    'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ));

  // Second Footer Widget Area, located in the footer. Empty by default.
  register_sidebar(array(
    'name' => __('Footer - Column 2', 'Charco'),
    'id' => 'footer-column-2',
    'description' => __('The second footer widget area', 'Charco'),
    'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ));

  // Third Footer Widget Area, located in the footer. Empty by default.
  register_sidebar(array(
    'name' => __('Footer - Column 3', 'Charco'),
    'id' => 'footer-column-3',
    'description' => __('The third footer widget area', 'Charco'),
    'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ));
}

function remove_menus()
{
  global $menu;
  $restricted = array(
    __('Posts'), 
    __('Links'), 
    __('Comments'),
    __('Tools'),
  );
  end ($menu);
  while (prev($menu)){
    $value = explode(' ',$menu[key($menu)][0]);
    if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
  }
}
add_action('admin_menu', 'remove_menus');

function remove_submenus() 
{

  global $submenu;
  unset($submenu['index.php'][10]);
  unset($submenu['themes.php'][5]);
  unset($submenu['options-general.php'][15]);
  unset($submenu['options-general.php'][25]);
}
add_action('admin_menu', 'remove_submenus');