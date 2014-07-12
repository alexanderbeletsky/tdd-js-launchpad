module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/jasmine-ajax/mock-ajax.js',
			'source/**/*.js',
			'test/spec/**/*.js'
		],
		autoWatch: true,
		singleRun: true,
		browsers: ['Chrome', 'Firefox']
	});
};
