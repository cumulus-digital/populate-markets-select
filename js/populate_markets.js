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

		var retrieved_markets = [];
		function getMarkets(callback) {
			if (retrieved_markets.length) {
				callback(retrieved_markets);
			}
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
					retrieved_markets = markets;
					callback(markets);
				}
			);
		}

		// Operate on any Caldera Autoselect fields for populate_markets
		function addMarketsToCaldera(markets, select) {
			var select = $(select);
			var new_markets = [];
			markets.forEach(function(market) {
				new_markets.push(new Option(market, market, false, false));
			});
			var optgroup = $('<optgroup/>');
			optgroup.append(new_markets);
			select.append(optgroup).trigger('change');
		}

		// Handle any future forms
		$(document).on('cf.form.init', function(e, data) {
			var $this = $(this);
			var popmarks = $this.find('.populate_markets select');
			popmarks.each(function(select) {
				var select = $(this);
				getMarkets(function(markets) {
					addMarketsToCaldera(markets, select);
				});
			});
		});

		// Handle existing selects
		var populate_markets = $('.populate_markets select');
		populate_markets.each(function() {
			var select = $(this);
			getMarkets(function(markets) {
				addMarketsToCaldera(markets, select);
			});
		});

	});
})(jQuery, window.self);