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
		var retrieved_markets = [];
		function addMarketsToCaldera() {
			var new_markets = [];
			retrieved_markets.forEach(function(market) {
				new_markets.push(new Option(market, market, false, false));
			});
			popmarks.append(new_markets).trigger('change');
		}
		$(document).on('cf.form.init', function(e, data) {
			var $this = $(this);
			var popmarks = $this.find('.populate_markets select');
			if ( ! retrieved_markets.length) {
				getMarkets(function(markets) {
					retrieved_markets = markets;
					addMarketsToCaldera(popmarks);
				});
				return;
			}
			addMarketsToCaldera(popmarks);
		});

	});
})(jQuery, window.self);