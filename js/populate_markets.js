(function($, window, undefined) {
	$(function() {

		function handleSelects() {
			var populate_markets = $('.populate_markets select, select.populate_markets');
			if (populate_markets.length) {
				$('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css"></link>');
				$.getScript(
					'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js',
					function() {
						populate_markets.each(function() {
							var $select = $(this);
							var original_options = $select.find('option').map(function() {
								return $(this).text();
							});
							$select.on('select2:change', function() {
								$select.trigger('change');
							});
							$select.select2({
								allowClear: true,
								multiple: true,
								closeOnSelect: false,
								dropdownParent: $select.parents('form'),
								placeholder: {
									id: '',
									text: 'Select one or more markets'
								},
								width: '100%',
								ajax: {
									url: 'https://player.westwoodone.com/stations/stations.ashx',
									dataType: 'json',
									processResults: function(data) {
										var markets = [];
										data.forEach(function(station) {
											var market = station.city + ', ' + station.state;
											if ( ! markets.includes(market)) {
												markets.push(market);
											}
										});
										markets.sort();
										
										var ret = [];
										original_options.each(function() {
											ret.push({
												id: this,
												text: this
											});
										});

										markets.forEach(function(market) {
											ret.push({
												id: market.replace(', ', ' - '),
												text: market
											});
											//$select.append(new Option(market, market, false, false));
										});

										return {
											results: ret
										};
									}
								}
							});
						});
					}
				);
			}
		}

		// handle existing forms
		handleSelects();

	});
})(jQuery, window.self);