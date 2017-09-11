<?php

add_action( 'wp_enqueue_scripts', function() {
	if ( is_post_type_archive( 'handbook-page' ) || is_singular( 'handbook-page' ) || is_tax( 'handbook-section' ) ) {
		$dist = plugin_dir_url( __DIR__ . '/../../index.php' ) . 'dist';
		$min = PROD === true ? '.min' : '';

		$package_json = json_decode( file_get_contents( __DIR__ . '/../../package.json' ) )
			?: (object) [ 'version' => '1.0.1' ];

		wp_enqueue_style(
			'student-handbook',
			"$dist/{$package_json->name}$min.css",
			[],
			$package_json->version
		);
		wp_enqueue_script(
			$package_json->name,
			"$dist/{$package_json->name}$min.js",
			[ 'react', 'react-dom', 'lodash', 'prop-types' ],
			$package_json->version,
			true
		);
	}
}, 9999999 );
