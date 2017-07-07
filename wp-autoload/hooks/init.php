<?php

/**
 * Register the handbook-section post type.
 */
function csh_register_handbook_post_type() {
    register_post_type( 'handbook-page', array(
      'taxonomies' => array( 'handbook-section' ),
      'rewrite' => array( 'slug' => 'handbook' ),
      'hierarchical' => false,
      'label' => 'Handbook Pages',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
    ) );
}
add_action( 'init', 'csh_register_handbook_post_type' );


/**
 * Register the handbook-section taxonomy.
 */
function csh_register_handbook_taxonomy() {
    register_taxonomy( 'handbook-section', 'handbook-page', array(
      'hierarchical' => true,
      'show_in_rest' => true,
      'public' => true,
      'label' => 'Handbook Section'
    ) );
}
add_action( 'init', 'csh_register_handbook_taxonomy' );
