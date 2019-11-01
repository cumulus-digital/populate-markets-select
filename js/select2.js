(function($, window, undefined) {
	$(function() {

		var populate_markets = $('select.populate_markets');
		populate_markets.each(function() {
			var $select = $(this);
			var original_options = $select.find('option').map(function() {
				return $(this).attr('value');
			});

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
						
						var ret = [];
						original_options.each(function() {
							ret.push({
								id: this,
								text: this
							});
						});

						markets.forEach(function(market) {
							ret.push({
								id: market,
								text: market
							});
						});

						console.log(ret);
						
						return {
							results: ret
						};
					}
				}
			});
		});

		$('.wpcf7 select:not(.populate_markets)').each(function() {
			var $select = $(this);
			$select.select2({
				multiple: $select.attr('multiple') ? true : false,
				width: '100%',
				dropdownParent: $select.parents('.wpcf7')
			});
		});

	});
})(jQuery, window);