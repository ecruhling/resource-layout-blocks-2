<?php
/**
 * Plugin Name: Resource Layout Blocks 2
 * Description: The standard page layout blocks for Containers, Rows, and Columns.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version: 2.0
 * Author:            Erik Rühling
 * Text Domain:       resource
 */

namespace Resource_LB2;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Constants
 */
const RESOURCE_LAYOUT_BLOCKS_2_SLUG = 'resource-layout-blocks-2';

/**
 * Register the layout blocks
 */
function resource_layout_blocks_init() {
	$blocks_dir = __DIR__ . '/dist/blocks';
	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}

	// The order below is the order that they will appear in the editor.
	$blocks = array(
		'container',
		'row',
		'column',
	);

	foreach ( $blocks as $block ) {
		register_block_type_from_metadata(
			trailingslashit( $blocks_dir ) . trailingslashit( $block )
		);
	}
}

add_action( 'init', __NAMESPACE__ . '\resource_layout_blocks_init' );

/**
 * Register editor.css (Block Editor styles only).
 */
add_action('enqueue_block_editor_assets', function () {
	$css_path = __DIR__ . '/dist/editor.css';
	if ( ! file_exists( $css_path ) ) {
		return;
	}

	wp_enqueue_style(
		'resource-layout-blocks-2-editor-styles',
		plugins_url('dist/editor.css', __FILE__),
		array(),
		filemtime($css_path)
	);
});

/**
 * Register Resource Layout Blocks category.
 *
 * @param array $block_categories Array of categories for block types.
 */
function resource_category( array $block_categories ): array {
	$resource_category = [
		'slug'  => RESOURCE_LAYOUT_BLOCKS_2_SLUG,
		'title' => __( 'Resource Layout Blocks 2', 'resource' ),
		'icon'  => null, // icon is set in index.js of each block.
	];

	// Check if the category already exists
	$exists = false;
	foreach ( $block_categories as $category ) {
		if ( isset( $category['slug'] ) && $category['slug'] === $resource_category['slug'] ) {
			$exists = true;
			break;
		}
	}

	// Add the category if it doesn't exist
	if ( ! $exists ) {
		$block_categories[] = $resource_category;
	}
	// move the new category to the start of the block category list.
	array_unshift( $block_categories, $resource_category );

	return $block_categories;
}

add_filter( 'block_categories_all', __NAMESPACE__ . '\resource_category', 10, 2 );
