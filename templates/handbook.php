<?php
/**
 * Template used to display the handbook.
 *
 * @package colbycomms/wp-handbook
 */

get_header();
?>
<main id="main">
	<article class="student-handbook-container">
		<h1 class="student-handbook-container__title">
			<?php colby_handbook_the_handbook_title(); ?>
		</h1>
		<div data-student-handbook></div>
	</article>
</main>
<?php
get_footer();
