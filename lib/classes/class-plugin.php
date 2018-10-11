<?php
/**
 * Main plugin class.
 *
 * @package colbycomms/wp-handbook
 */

namespace ColbyComms\Handbook;

use ByJG\DesignPattern\Singleton;
use Carbon_Fields\Carbon_Fields;
use Carbon_Fields\{Container, Field};
use Carbon_Fields\Helper\Helper;

/**
 * Sets up the plugin.
 */
class Plugin {
	use Singleton;

	const POST_TYPE      = 'handbook-page';
	const TAXONOMY       = 'handbook-section';
	const ASSET_HANDLE   = 'wp-handbook';
	const HANDBOOK_TITLE = 'wp-handbook__handbook-title';

	/**
	 * Adds hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'template_include', [ $this, 'include_template' ] );
		add_action( 'after_setup_theme', [ Carbon_Fields::class, 'boot' ] );
		add_action( 'carbon_fields_register_fields', [ $this, 'create_options_container' ], 9 );
		add_filter( 'rest_prepare_handbook-page', [ $this, 'add_category_slug_to_rest_data' ] );
	}

	/**
	 * Creates the Carbon Fields options page.
	 *
	 * @return void
	 */
	public function create_options_container() {
		Container::make(
			'theme_options',
			esc_html__( 'Handbook Options', 'colby-handbook' )
		)
			->set_page_parent( 'edit.php?post_type=handbook-page' )
			->add_fields( [
				Field::make( 'text', self::HANDBOOK_TITLE, esc_html__( 'Handbook Title', 'colby-handbook' ) )
					->set_help_text( esc_html__( 'The title is displayed at various places around the handbok', 'colby-handbook' ) ),
			] );

	}

	/**
	 * Registers the post type.
	 *
	 * @return void
	 */
	public function register_post_type() {
		register_post_type( self::POST_TYPE, [
			'taxonomies'   => [ self::TAXONOMY ],
			'rewrite'      => [ 'slug' => 'handbook' ],
			'hierarchical' => true,
			'label'        => esc_html__( 'Handbook Pages', 'colby-handbook' ),
			'public'       => true,
			'has_archive'  => true,
			'show_in_rest' => true,
			'supports'     => [ 'title', 'editor', 'page-attributes' ],
		] );
	}

	/**
	 * Whether the handbook is displaying.
	 *
	 * @return boolean
	 */
	public function is_handbook() {
		return is_post_type_archive( 'handbook-page' )
			|| is_singular( 'handbook-page' )
			|| is_tax( 'handbook-section' );
	}

	/**
	 * Register the handbook-section taxonomy.
	 */
	public function register_taxonomy() {
		register_taxonomy( self::TAXONOMY, self::POST_TYPE, [
			'hierarchical' => true,
			'show_in_rest' => true,
			'public'       => true,
			'label'        => esc_html__( 'Handbook Section' ),
		] );
	}

	/**
	 * Enqueues assets.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		if ( ! $this->is_handbook() ) {
			return;
		}

		wp_enqueue_script(
			self::ASSET_HANDLE,
			sprintf( '%sdist/%s.js',
				trailingslashit( COLBY_HANDBOOK_URL ),
				self::ASSET_HANDLE
			),
			[],
			filemtime(
				sprintf(
					'%sdist/%s.js',
					trailingslashit( COLBY_HANDBOOK_PATH ),
					self::ASSET_HANDLE
				)
			),
			true
		);

		wp_enqueue_style(
			self::ASSET_HANDLE,
			sprintf( '%sdist/%s.css',
				trailingslashit( COLBY_HANDBOOK_URL ),
				self::ASSET_HANDLE
			),
			[],
			filemtime(
				sprintf(
					'%sdist/%s.css',
					trailingslashit( COLBY_HANDBOOK_PATH ),
					self::ASSET_HANDLE
				)
			)
		);

		wp_localize_script(
			self::ASSET_HANDLE,
			'colbyWpHandbook',
			[
				'restUrl' => rest_url( 'wp/v2/' ),
			]
		);
	}

	/**
	 * Filters the template.
	 *
	 * @param string $template The unfiltered template.
	 * @return string The filtered template.
	 */
	public function include_template( $template ) {
		if ( $this->is_handbook() ) {
			return trailingslashit( COLBY_HANDBOOK_PATH ) . 'templates/handbook.php';
		}

		return $template;
	}

	public function get_handbook_title() {
		return Helper::get_theme_option( self::HANDBOOK_TITLE );
	}

	public function add_category_slug_to_rest_data( $response ) {
		if ( ! isset( $response->data['handbook-section'] ) || empty( $response->data['handbook-section'] ) ) {
			return $response;
		}

		$term = get_term_by(
			'id',
			$response->data['handbook-section'][0],
			'handbook-section'
		);

		if ( empty( $term ) || ! is_a( $term, '\WP_Term' ) ) {
			return $response;
		}

		$response->data['categorySlug'] = $term->slug;

		return $response;
	}
}