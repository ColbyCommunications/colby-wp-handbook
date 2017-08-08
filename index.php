<?php
/**
 * Plugin Name: Colby Student Handbook
 *
 */

require_once( 'wp-autoload/index.php' );

/** Load the ACF export. */
add_action( 'plugins_loaded', function() {
    include 'fields.php';
} );
