<?php

use PHPUnit\Framework\TestCase;
use function Resource_LB2\resource_category;
use function Resource_LB2\resource_layout_blocks_init;

final class PluginTest extends TestCase {
	protected function setUp(): void {
		$GLOBALS['rlb2_blocks']      = array();
		$GLOBALS['rlb2_styles']      = array();
		$GLOBALS['rlb2_is_dir']      = null;
		$GLOBALS['rlb2_file_exists'] = null;
		$GLOBALS['rlb2_filemtime']   = null;
	}

	public function test_registers_wordpress_hooks_on_load() {
		$init_hook = $GLOBALS['rlb2_actions']['init'][0];
		$this->assertSame( 'Resource_LB2\\resource_layout_blocks_init', $init_hook['callback'] );
		$this->assertSame( 10, $init_hook['priority'] );

		$editor_hook = $GLOBALS['rlb2_actions']['enqueue_block_editor_assets'][0];
		$this->assertInstanceOf( Closure::class, $editor_hook['callback'] );

		$category_hook = $GLOBALS['rlb2_filters']['block_categories_all'][0];
		$this->assertSame( 'Resource_LB2\\resource_category', $category_hook['callback'] );
		$this->assertSame( 2, $category_hook['accepted_args'] );
	}

	public function test_registers_all_blocks_in_editor_order() {
		$GLOBALS['rlb2_is_dir'] = true;

		resource_layout_blocks_init();

		$blocks_dir = dirname( __DIR__ ) . '/dist/blocks/';
		$this->assertSame(
			array(
				$blocks_dir . 'container/',
				$blocks_dir . 'row/',
				$blocks_dir . 'column/',
			),
			$GLOBALS['rlb2_blocks']
		);
	}

	public function test_skips_block_registration_when_build_directory_is_missing() {
		$GLOBALS['rlb2_is_dir'] = false;

		resource_layout_blocks_init();

		$this->assertSame( array(), $GLOBALS['rlb2_blocks'] );
	}

	public function test_enqueues_versioned_editor_stylesheet_when_it_exists() {
		$GLOBALS['rlb2_file_exists'] = true;
		$GLOBALS['rlb2_filemtime']   = 1722790800;

		$this->run_editor_assets_hook();

		$this->assertSame(
			array(
				array(
					'handle'       => 'rlb2-editor-styles',
					'src'          => '/plugins/resource-layout-blocks-2/dist/editor.css',
					'dependencies' => array(),
					'version'      => 1722790800,
				),
			),
			$GLOBALS['rlb2_styles']
		);
	}

	public function test_skips_editor_stylesheet_when_build_file_is_missing() {
		$GLOBALS['rlb2_file_exists'] = false;

		$this->run_editor_assets_hook();

		$this->assertSame( array(), $GLOBALS['rlb2_styles'] );
	}

	public function test_adds_resource_category_to_front_without_duplicates() {
		$categories = array(
			array( 'slug' => 'text', 'title' => 'Text' ),
			array( 'slug' => 'media', 'title' => 'Media' ),
		);

		$result = resource_category( $categories );

		$this->assertSame( 'resource-layout-blocks-2', $result[0]['slug'] );
		$this->assertSame( array( 'text', 'media' ), array_column( array_slice( $result, 1 ), 'slug' ) );
		$this->assertCount( 1, array_filter( $result, static function ( $category ) {
			return 'resource-layout-blocks-2' === $category['slug'];
		} ) );
	}

	public function test_moves_existing_resource_category_to_front_without_duplicates() {
		$categories = array(
			array( 'slug' => 'text', 'title' => 'Text' ),
			array( 'slug' => 'resource-layout-blocks-2', 'title' => 'Old title' ),
			array( 'slug' => 'media', 'title' => 'Media' ),
		);

		$result = resource_category( $categories );

		$this->assertSame(
			array( 'resource-layout-blocks-2', 'text', 'media' ),
			array_column( $result, 'slug' )
		);
		$this->assertSame( 'Resource Layout Blocks 2', $result[0]['title'] );
	}

	private function run_editor_assets_hook() {
		$callback = $GLOBALS['rlb2_actions']['enqueue_block_editor_assets'][0]['callback'];
		$callback();
	}
}
