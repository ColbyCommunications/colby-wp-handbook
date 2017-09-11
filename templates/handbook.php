<?php
add_filter( 'wp_title', function( $title ) {
	return 'Colby College Student Handbook';
} );

add_filter( 'body_class', function( $classes ) {
	$classes[] = 'page';
	return $classes;
} );
get_header();

echo do_action( 'colby_college__before_main', '' );
?>
<main id="main" class="noPostThumbnail page">
	<?php echo apply_filters( 'pre_main_article', '' ); ?>
	<article class="student-handbook-container">
		<h1 class="student-handbook-container__title">Colby College Student Handbook</h1>
		<div data-student-handbook></div>
	</article>
</main>
<?php
get_footer();
