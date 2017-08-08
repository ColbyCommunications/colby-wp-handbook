<?php

add_filter( 'body_class', function( $classes ) {
	$classes[] = 'page';
	return $classes;
} );


$active_category = wp_get_post_terms( $post_id, 'handbook-section' )[0]->name;

get_header();
?>
<main id="main" class="main--index">
	<?php echo apply_filters( 'pre_main_article', '' ); ?>
	<article class="student-handbook-container">
		<h1 class="student-handbook-container__title">Colby College Student Handbook</h1>
		<div data-student-handbook data-active-category=<?php echo $active_category; ?>></div>
	</article>
</main>
<?php
get_footer();
