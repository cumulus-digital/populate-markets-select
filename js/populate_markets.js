(function($, window, undefined) {
	$(function() {

		// Operations for all Caldera Autoselect fields
			// Close select2 when Popup Maker closes
			$('.pum').on('pumBeforeClose', function() {
				var $this = jQuery(this);
				$this.find('.ccselect2-container ~ select').select2('close');
			});

			// Close all autoselects if clicking anywhere else
			$(document).on('click', function(e) {
				if (e.target.className.indexOf('ccselect2') < 0) {
					$('.ccselect2-container').select2('close');
				}
			});

		function getMarkets(callback) {
			$.getJSON(
				"https://player.westwoodone.com/stations/stations.ashx",
				function( data ) {
					var markets = [];
					data.forEach(function(station) {
						var market = station.city + ', ' + station.state;
						if ( ! markets.includes(market)) {
							markets.push(market);
						}
					});
					markets.sort();
					callback(markets);
				}
			);
		}

		// Operate on any Caldera Autoselect fields for populate_markets
		var caldera_autoselects = $('.populate_markets .ccselect2-container ~ select');
		console.log('caldera found:', caldera_autoselects);
		if (caldera_autoselects.length) {

			// Retrieve and fill markets
			getMarkets(function(markets) {
				var new_markets = []
				markets.forEach(function(market) {
					new_markets.push(new Option(market, market, false, false));
				});
				caldera_autoselects.each(function() {
					var $select = $(this);
					$select.append(new_markets).trigger('change');
				});
			})

		}

	});
})(jQuery, window.self);