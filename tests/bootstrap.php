<?php

namespace Resource_LB2 {
	function is_dir( $path ) {
		if ( null !== $GLOBALS['rlb2_is_dir'] ) {
			return $GLOBALS['rlb2_is_dir'];
		}

		return \is_dir( $path );
	}

	function file_exists( $path ) {
		if ( null !== $GLOBALS['rlb2_file_exists'] ) {
			return $GLOBALS['rlb2_file_exists'];
		}

		return \file_exists( $path );
	}

	function filemtime( $path ) {
		if ( null !== $GLOBALS['rlb2_filemtime'] ) {
			return $GLOBALS['rlb2_filemtime'];
		}

		return \filemtime( $path );
	}
}

namespace {
	define( 'ABSPATH', dirname( __DIR__, 4 ) . '/' );

	$GLOBALS['rlb2_actions']       = array();
	$GLOBALS['rlb2_filters']       = array();
	$GLOBALS['rlb2_blocks']        = array();
	$GLOBALS['rlb2_styles']        = array();
	$GLOBALS['rlb2_is_dir']        = null;
	$GLOBALS['rlb2_file_exists']   = null;
	$GLOBALS['rlb2_filemtime']     = null;

	function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		$GLOBALS['rlb2_actions'][ $hook ][] = compact( 'callback', 'priority', 'accepted_args' );
	}

	function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		$GLOBALS['rlb2_filters'][ $hook ][] = compact( 'callback', 'priority', 'accepted_args' );
	}

	function trailingslashit( $value ) {
		return rtrim( $value, '/\\' ) . '/';
	}

	function register_block_type_from_metadata( $path ) {
		$GLOBALS['rlb2_blocks'][] = $path;
	}

	function plugins_url( $path, $plugin_file ) {
		return '/plugins/' . basename( dirname( $plugin_file ) ) . '/' . ltrim( $path, '/' );
	}

	function wp_enqueue_style( $handle, $src, $dependencies = array(), $version = false ) {
		$GLOBALS['rlb2_styles'][] = compact( 'handle', 'src', 'dependencies', 'version' );
	}

	function __( $text, $domain ) {
		return $text;
	}

	require_once dirname( __DIR__ ) . '/resource-layout-blocks-2.php';
}
