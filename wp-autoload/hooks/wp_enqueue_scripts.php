<?php

add_action( 'wp_enqueue_scripts', function() {
	$dist = plugin_dir_url( __DIR__ . '/../../index.php' ) . 'dist';
	$min = PROD === true ? '.min' : '';

	wp_enqueue_style( 'student-handbook', "$dist/colby-wp-react-student-handbook$min.css" );
	wp_enqueue_script(
		'student-handbook',
		"$dist/colby-wp-react-student-handbook$min.js",
		['react', 'react-dom']
	);
} );
