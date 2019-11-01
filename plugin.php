<?php
/**
 * Plugin Name: Populate Markets Select
 * Plugin URI: https://github.com/cumulus-digital/populate-markets-select
 * Description: With Caldera Forms and Popup Maker, allow a field with populate_markets class to fetch station markets from the station finder.
 * Author: vena
 * Version: 1.0.8
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
		null, false, 'all'
	);
}

add_action( 'wp_enqueue_scripts', 'populate_markets_select_init_scripts' );
