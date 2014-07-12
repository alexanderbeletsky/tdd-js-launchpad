module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.js',
			'source/**/*.js',
			'test/spec/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['Chrome']
	});
};
