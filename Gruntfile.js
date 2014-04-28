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
        		pushTo: 'origin'

        	}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('publish', function (target) {

      /*
      TODO
      This function should:
      1. check that git is upto date otherwise: fail
      2. run npm test: otherwise fail.
      3. check that the published npm version number matches the local one.
      4. run grunt publish: fail and rollback on any error.
      5. run npm publish: fail and rollback on any error.

       */

    	grunt.task.run(['bump:patch']);
    });

}