(function($, window, undefined) {
	$(function() {

		var populate_markets = $('select.populate_markets');
		populate_markets.each(function() {
			var $select = $(this);
			$select.select2({
				allowClear: true,
				multiple: true,
				closeOnSelect: false,
				dropdownParent: $select.parents('.wpcf7'),
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
						return {
							results: markets
						};
					}
				}
			});
		});

		$('.wpcf7 select:not(.populate_markets)').each(function() {
			var $select = $(this);
			$select.select2({
				multiple: $select.attr('multiple') ? true : false,
				width: '100%'
			});
		});

	});
})(jQuery, window);