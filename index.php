<?php
/**
 * Plugin Name: Colby Student Handbook
 * Description: A single-page application displaying the Colby College student handbook from the WordPress REST API.
 * Author: John Watkins, Colby Communications
 */

require_once( 'wp-autoload/index.php' );

/** Load the ACF export. */
add_action( 'plugins_loaded', function() {
    include 'fields.php';
} );

add_filter( 'template_include', function( $template ) {

	if ( is_post_type_archive( 'handbook-page' ) || is_singular( 'handbook-page' ) ) {
		return __DIR__ . '/templates/handbook.php';
	}
	return $template;
} );
