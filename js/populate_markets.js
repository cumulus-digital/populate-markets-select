(function($, window, undefined) {
	$(function() {

		/*
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

		// Add markets to a given select
		function addMarketsToSelect(markets, select) {
			var select = $(select);
			var new_markets = [];
			markets.forEach(function(market) {
				//new_markets.push(new Option(market, market, false, false));
				new_markets.push($('<option data-calc-value="' + market + '" value="' + market + '">' + market + '</option>'));
			});
			select.append(new_markets).parents('.populate_markets').trigger('change');
		}

		// Handle existing selects
		var populate_markets = $('.populate_markets select, select.populate_markets');
		populate_markets.each(function() {
			var select = $(this);
			if ( ! select.data('markets-loading')) {
				select.data('markets-loading', true);
				getMarkets(function(markets) {
					addMarketsToSelect(markets, select);
				});
			}
		});
		*/

	});
})(jQuery, window.self);