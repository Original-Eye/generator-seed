'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          files: ['app/**/*.js','test/**/*.js'],
          options: {
          	//reference the .jshintrc file
          	jshintrc: true,
            globals: {
              jQuery: true,
              console: true,
              module: true,
            }
          }
        },
        watch: {
        	files: ['**/*', '!**/node_modules/**'],
        	tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

}