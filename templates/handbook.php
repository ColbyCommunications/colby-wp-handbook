<?php
add_filter( 'wp_title', function( $title ) {
	return 'Colby College Student Handbook';
} );

add_filter( 'body_class', function( $classes ) {
	$classes[] = 'page';
	return $classes;
} );
get_header();

if ( has_post_thumbnail() && function_exists( 'colby_hero' ) ) {
	 echo colby_hero(
		 wp_get_attachment_image_src( get_post_thumbnail_id(), 'hero' ),
		 get_post_meta( get_the_id(), 'header_content', 1 ) ?: get_the_title()
	 );
}

if ( function_exists( 'colby_site_menu' ) ) {
	echo colby_site_menu(
		'site-menu',
		'header',
		'levelTwoPageHeader ' . ( has_post_thumbnail() ? 'has-' : 'no-' ) . 'post-thumbnail'
	);
}

?>
<main id="main" class="levelTwoPage">
	<?php echo apply_filters( 'pre_main_article', '' ); ?>
	<article class="student-handbook-container">
		<h1 class="student-handbook-container__title">Colby College Student Handbook</h1>
		<div data-student-handbook></div>
	</article>
</main>
<?php
get_footer();
