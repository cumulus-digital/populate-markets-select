<?php
/**
 * Plugin Name: Populate Markets Select
 * Plugin URI: https://github.com/cumulus-digital/populate-markets-select
 * Description: Auto-fill a select field with class name "populate_markets" from the station finder. Works with standard select inputs and Ninja Forms.
 * Author: vena
 * Version: 1.0.40
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
}

add_action( 'wp_enqueue_scripts', 'populate_markets_select_init_scripts' );
