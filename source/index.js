var app = app || {};

var widget = app.TemperatureWidget = function ($container) {
	this.$el = $container;
	this.requestData();
};

widget.prototype.requestData = function () {
	this.dataReady = $.get('/api/temperature').promise();
};

widget.prototype.render = function () {
	var me = this;

	this.dataReady.done(function (data) {
		var $template =
			$('<div class="temperature-widget">\
				<div class="temperature-block">[TEMPERATURE] C</div>\
				<button class="temperature-update">Update</button>\
			</div>'.replace('[TEMPERATURE]', data.temperature));

		$template.find('button.temperature-update').click(
			$.proxy(me.updateTemperature, me));

		me.$el.html($template);
	});
};

widget.prototype.updateTemperature = function () {
	this.requestData();
	this.render();
};