<?php

add_filter( 'rest_prepare_handbook-page', function( $response ) {
	foreach ( ['content', 'excerpt', 'title'] as $field ) {
		$response->data[$field] = $response->data[$field]['rendered'];
	}

	return $response;
} );
