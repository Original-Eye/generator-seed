'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          files: ['app/**/*.js','test/**/*.js', '!**/temp/**' ],
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
        },
        bump: {
        	options: {
        		files: ['package.json'],
        		commit: true,
        		commitMessage: 'Release v%VERSION%',
        		commitFiles: ['package.json'],
        		createTag: false,
        		push: true,
        		pushTo: 'origin/master'

        	}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('publish', function (target) {

    	grunt.task.run(['bump:patch']);
    });

}