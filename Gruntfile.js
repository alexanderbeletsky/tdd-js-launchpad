/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine: {
      all: {
        src: ['source/**/*.js'],
        options: {
          specs: ['test/spec/**/*.js']
        }
      }
    }
  });
  // Laoded tasks
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('test', ['jasmine']);
};
