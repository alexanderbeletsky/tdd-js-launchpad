/* globals jasmine, app */
describe('Temperature Widget specs', function () {
	var $container, widget;

	beforeEach(function () {
		jasmine.Ajax.install();
		$container = $('<div class="test-container"></div>');
		$container.appendTo('body');
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
		$container.remove();
	});

	beforeEach(function () {
		widget = new app.TemperatureWidget($container);
	});

	beforeEach(function () {
		jasmine.Ajax.requests.mostRecent().response({
			'status': 200,
			'content/type': 'application/json',
			'responseText': JSON.stringify({temperature: 26})
		});
	});

	describe('when initialized', function () {
		it('should fetch temperature from server', function () {
			expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/api/temperature');
		});
	});

	describe('when rendered', function () {
		beforeEach(function () {
			widget.render();
		});

		it('should create temperature widget container', function () {
			expect($container.find('.temperature-widget').length).toEqual(1);
		});

		it('should contain temperature block', function () {
			expect($container.find('.temperature-block').text()).toEqual('26 C');
		});

		it('should contain update button', function () {
			expect($container.find('button.temperature-update').length).toEqual(1);
		});

		describe('when events', function () {
			describe('update button clicked', function () {
				beforeEach(function () {
					$container.find('button.temperature-update').click();
				});

				beforeEach(function () {
					jasmine.Ajax.requests.mostRecent().response({
						'status': 200,
						'content/type': 'application/json',
						'responseText': JSON.stringify({temperature: 22})
					});
				});

				it('should update temperature', function () {
					expect($container.find('.temperature-block').text()).toEqual('22 C');
				});
			});
		});
	});
});