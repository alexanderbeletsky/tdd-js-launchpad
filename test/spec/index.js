/* globals jasmine, app */
describe('Temperature widget spec', function () {
	var $container, widget;

	beforeEach(function () {
		jasmine.Ajax.install();
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
	});

	beforeEach(function () {
		$container = $('<div class="test-container">aaaaaaa</div>');
		$container.appendTo('body');
	});

	afterEach(function () {
		$container.remove();
	});

	beforeEach(function () {
		widget = new app.TemperatureWidget($container);
	});

	beforeEach(function () {
		jasmine.Ajax.requests.mostRecent().response({
			"status": 200,
			"contentType": 'application/json',
			"responseText": JSON.stringify({temperature: 27})
		});
	});

	it('should fetch the data', function () {
		expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/api/temperature');
	});

	describe('when rendered', function () {
		beforeEach(function () {
			widget.render();
		});

		it('should render widget container', function () {
			expect($container.find('.temperature-widget').length).toEqual(1);
		});

		it('should render temperature', function () {
			expect($container.find('.temperature-widget .temperature').text()).toEqual('27 C');
		});

		describe('and temperatur re-fetched', function () {
			beforeEach(function () {
				$container.find('button.temperature-fetch').click();
			});

			beforeEach(function () {
				jasmine.Ajax.requests.mostRecent().response({
					"status": 200,
					"contentType": 'application/json',
					"responseText": JSON.stringify({temperature: 22})
				});
			});

			it('should update temperature', function () {
				expect($container.find('.temperature-widget .temperature').text()).toEqual('22 C');
			});
		});
	});
});