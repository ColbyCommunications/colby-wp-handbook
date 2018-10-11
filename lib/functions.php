<?php
/**
 * Plugin functions
 *
 * @package colbycomms/wp-handbook
 */

use ColbyComms\Handbook\Plugin;

/**
 * Provides the handbook title.
 *
 * @return string
 */
function colby_handbook_get_handbook_title() {
	return Plugin::getInstance()->get_handbook_title();
}

/**
 * Echoes the Handbook title.
 */
function colby_handbook_the_handbook_title() {
	echo wp_kses_post( colby_handbook_get_handbook_title() );
}
