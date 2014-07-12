var app = app || {};

$(function () {
	var widget = app.TemperatureWidget = function ($container) {
		this.$container = $container;
		this.init();
	};

	widget.prototype.init = function (callback) {
		var me = this;

		$.get('/api/temperature', function (data) {
			me.data = data;

			callback && callback();
		});
	};

	widget.prototype.render = function () {
		this.$ = $('<div class="temperature-widget">\
			<div class="temperature">[TEMPERATURE] C</div>\
			<button class="temperature-fetch">Update</div>\
		</div>'.replace('[TEMPERATURE]', this.data.temperature));

		this.$.find('.temperature-fetch').on('click', $.proxy(this.updateTemperature, this));

		this.$container.html(this.$);
	};

	widget.prototype.updateTemperature = function () {
		var me = this;
		this.init(function () {
			me.render();
		});
	};
});