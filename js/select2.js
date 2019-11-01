(function($, window, undefined) {
	$(function() {

		$('.populate_markets').select2({
			allowClear: true,
			multiple: true,
			closeOnSelect: false,
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
					return {
						results: markets
					};
				}
			}
		});

		$('.wpcf7 select:not(.populate_markets)').each(function() {
			var $select = $(this);
			$select.select2({
				multiple: $select.attr('multiple') ? true : false
			});
		});

	});
})(jQuery, window);