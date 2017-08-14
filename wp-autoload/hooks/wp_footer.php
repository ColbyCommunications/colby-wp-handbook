<?php
add_action( 'wp_footer', function() {
	ob_start(); ?>
<script>
window.COLBY_HANDBOOK_REST_URL = '<?php echo get_rest_url() . "wp/v2/"; ?>';
</script>
	<?php
	echo ob_get_clean();
} );
