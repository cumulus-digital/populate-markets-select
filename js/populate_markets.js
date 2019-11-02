(function($, window, undefined) {
	$(function() {

		if ($.fn.select2) {
			$.fn.select2.defaults.set('width', '100%');
			$.fn.select2.defaults.set(
				'dropdownParent',
				this.parentNode
			);
		}

		var isMobile = false;
		var populate_markets = $('.populate_markets select, select.populate_markets');
		var got_markets;

		// Popup Maker forms need to be reset on open
		$('.pum').on('pumBeforeOpen', function() {
			var fluentform = $(this).find('.fluentform');
			fluentform.each(function() {
				var $this = $(this);
				$this.find('form').show().each(function() {
					this.reset();
				});
				$this.find('.ff-message-success').hide();
			});
		});

		// Don't use select2 on mobile
		if (window.matchMedia && window.matchMedia('(pointer:none) or (pointer:coarse)').matches) {
			isMobile = true;
			if ( ! $.fn.select2 || ! $.fn.selectWoo) {
				$(window).load(function() {
					$('select').select2('disable');
				});
			}
		}

		function getMarkets(callback) {
			if (got_markets) {
				return got_markets;
			}
			$.getJSON(
				'https://player.westwoodone.com/stations/stations.ashx',
				function(data) {
					var markets = [];
					data.forEach(function(station) {
						var market = station.city + ', ' + station.state;
						if ( ! markets.includes(market)) {
							markets.push(market);
						}
					});
					markets.sort();
					got_markets = markets;
					if (callback) {
						callback(got_markets);
					}
				}
			);
		}

		if (populate_markets.length) {

			// Load markets
			getMarkets(function(markets) {
				var market_opts = [];
				markets.forEach(function(market) {
					market_opts.push(
						new Option(market, market, false, false)
					);
				});
				var optgroup = $('<optgroup/>', { label: 'Markets' });
				optgroup.append(market_opts);

				populate_markets
					.append(optgroup)
					.trigger('change');

				// Disable select2 on mobile
				if ( ($.fn.select2 || $.fn.selectWoo) && isMobile ) {
					populate_markets.select2('destroy');
				}

				// If desktop and select2 isn't loaded, load it.
				if ( ( ! $.fn.select2 || ! $.fn.selectWoo) && ! isMobile) {
					// Add Chosen stylesheet
					$('body').append(
						'<link/>', {
							rel: 'preload',
							href: 'https://cdn.jsdelivr.net/npm/select-woo@1.0.1/dist/css/selectWoo.min.css',
							on: { load: 'this.rel="stylesheet"' }
						}
					);
					$.getScript(
						'https://cdn.jsdelivr.net/npm/select-woo@1.0.1/dist/js/selectWoo.min.js',
						function() {
							populate_markets.select2({
								allowClear: true,
								multiple: true,
								closeOnSelect: false,
								dropdownParent: $select.parents('form'),
								placeholder: {
									id: '',
									text: 'Select one or more'
								},
								width: '100%'
							});
						}
					);
				}
			});

		}

	});
})(jQuery, window.self);