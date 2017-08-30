<?php

add_filter( 'rest_prepare_handbook-page', function( $response ) {
	$slug = get_term_by(
		'id',
		$response->data['handbook-section'][0],
		'handbook-section'
	);

	if ( ! $slug || ! $slug->slug ) {
		return null;
	}

	$response->data['categorySlug'] = $slug->slug;

	return $response;
} );
