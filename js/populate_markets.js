(function($, window, undefined) {
	$(function() {

		var got_markets = [];
		function getMarkets(callback) {
			if (got_markets.length) {
				return markets;
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
					got_markets = markets;
					callback();
				}
			);
		}

		function handleSelects() {
			var $populate_markets = $('.populate_markets select, select.populate_markets');
			if ($populate_markets.length) {
				$('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css"></link>');
				$.getScript(
					'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js',
					function() {
						$populate_markets.each(function() {
							var $select = $(this);
							getMarkets(function() {
								var markets = got_markets.map(function(market) {
									return new Option(market, market, false, false);
								});
								$select.append(markets);
								/*
								$select.select2({
									allowClear: true,
									multiple: true,
									closeOnSelect: false,
									dropdownParent: $select.parents('form'),
									placeholder: {
										id: '',
										text: 'Select one or more markets'
									},
									width: '100%'
								});
								*/
							})
						});
					}
				);
			}
		}

		// Handle ninja forms
		$(document).on('nfFormReady', handleSelects);

		// handle existing forms
		handleSelects();

	});
})(jQuery, window.self);