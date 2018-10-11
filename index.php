<?php
/**
 * Plugin Name: WP Handbook
 * Description: Displays a student handbook (or similar material) from a custom post type.
 * Author: John Watkins
 *
 * @package colbycomms/wp-handbook
 */

// Path to this plugin.
define( 'COLBY_HANDBOOK_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );

// URL path to this plugin.
define( 'COLBY_HANDBOOK_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );

if ( ! file_exists( sprintf( '%svendor/autoload.php', COLBY_HANDBOOK_PATH ) ) ) {
	return;
}

require_once( sprintf( '%svendor/autoload.php', COLBY_HANDBOOK_PATH ) );
require_once( sprintf( '%slib/functions.php', COLBY_HANDBOOK_PATH ) );

ColbyComms\Handbook\Plugin::getInstance()->init();
