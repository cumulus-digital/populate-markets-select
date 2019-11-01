<?php
/**
 * Plugin Name: Populate Markets Select
 * Plugin URI: https://github.com/cumulus-digital/populate-markets-select
 * Description: Auto-fill a select field with class name "populate_markets" from the station finder. Also adds styles and scripts for Contact Form 7.
 * Author: vena
 * Version: 1.0.35
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: cumulus-digital/populate-markets-select
 */

function populate_markets_select_init_scripts() {
	wp_enqueue_script(
		'populate_markets_select_init_scripts',
		plugins_url( 'js/populate_markets.js', __FILE__ ),
		array('jquery'), null, true
	);
	wp_register_style(
		'populate_markets_select_init_styles',
		plugins_url( 'css/populate_markets.css', __FILE__ ),
		false, null
	);
	wp_enqueue_style('populate_markets_select_init_styles');

	if (is_plugin_active('contact-form-7/wp-contact-form-7.php')) {
		wp_enqueue_script(
			'populate_markets_select_select2_scripts',
			'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js',
			array('jquery', 'populate_markets_select_init_scripts'), null, true
		);
		wp_enqueue_script(
			'populate_markets_select_select2_localscripts',
			plugins_url( 'js/select2.js', __FILE__ ),
			array('jquery', 'populate_markets_select_select2_scripts'), null, true
		);
		wp_register_style(
			'populate_markets_select_select2_styles',
			'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css',
			false, null
		);
		wp_enqueue_style('populate_markets_select_select2_styles');
		wp_register_style(
			'populate_markets_select_init_styles_cf7',
			plugins_url( 'css/cf7.css', __FILE__ ),
			false, null
		);
		wp_enqueue_style('populate_markets_select_init_styles_cf7');
	}
}

add_action( 'wp_enqueue_scripts', 'populate_markets_select_init_scripts' );
