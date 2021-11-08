<?php

if (!defined('ABSPATH')) {
  exit;
} //end if

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */

function gutenberg_cardContent_block_admin()
{
  wp_enqueue_script(
    'gutenberg-block-card-content',
    CH_THEME_URI . '/blocks/card-content/block.js',
    array('wp-blocks', 'wp-element'),
    CH_VERSION

  );

  wp_enqueue_style(
    'gutenberg-notice-block-editor',
    CH_THEME_URI . '/blocks/card-content/block.css',
    array(),
    CH_VERSION
  );
}

add_action('enqueue_block_editor_assets', 'gutenberg_cardContent_block_admin');
