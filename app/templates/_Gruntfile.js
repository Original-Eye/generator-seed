module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    gruntUser: process.env.GRUNT_USER,
    pkg: grunt.file.readJSON('package.json'),
    buildDir: 'build',
    AssetPath: 'client',
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    jshint: {
      files: [

        '<%= AssetPath %>/js/*.js',
      ],
      options: {
        '-W099': true,
        ignores: ['<%= AssetPath %>/js/selectivizr-min.js',
          '<%= AssetPath %>/js/plugins.js',
          '<%= AssetPath %>/js/placeholder.min.js',
          '<%= AssetPath %>/js/modernizr-2.5.2.min.js',
          '<%= AssetPath %>/js/jquery.validate.min.js'
        ],
        "globals": {
          "$": false
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'web/',
        src: [
          '*.inc',
          '*.php',
          '*.png',
          '*.ico',
          '*.txt',
          '.htaccess',
          'application/**/*',
          'system/**/*',
          'assets/images/**/*',
          'assets/gallery/**/*',
          'profile_pictures/**/*',
          'assets/js/mod*.js',
          'assets/css/*screen.css',
          'assets/css/tipTip.css',
          'assets/css/sales-layout.css',
          'assets/css/dashboard.css',
          'assets/css/viewer.css',
          'assets/css/jquery.fancybox.css',
          'assets/js/jquery.tipTip.minified.js',
        ],
        dest: '<%= buildDir %>',
      },
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= buildDir %>/assets',
        src: ['**/*'],
        dest: '<%= buildDir %>/assets'
      }
    },
    useminPrepare: {
      html: ['<%= buildDir %>/application/views/layouts/defaults/header.php',
        '<%= buildDir %>/application/views/layouts/backbone/js/core_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/dashboard/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/network/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/project/js/fileupload_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/project/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/projects/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/viewer/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/viewer/js/viewer_js.php',
      ],
      options: {
        dest: '<%= buildDir %>'
      }
    },
    usemin: {
      html: ['<%= buildDir %>/application/views/layouts/defaults/header.php',
        '<%= buildDir %>/application/views/layouts/backbone/js/core_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/dashboard/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/network/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/project/js/fileupload_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/project/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/projects/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/viewer/js/section_js.php',
        '<%= buildDir %>/application/views/layouts/backbone/viewer/js/viewer_js.php',

      ],
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },
    shell: {
      updatePermsDev: {
        command: 'ssh -t -t <%= gruntUser %>@popsapp.com "sudo chown -R popsapp.com:psaserv /var/www/vhosts/popsapp.com/dev.popsapp.com"',
        options: {
          stdout: true
        }
      },
      updatePermsLive: {
        command: 'ssh -t -t <%= gruntUser %>@popsapp.com "sudo chown -R popsapp.com:psaserv /var/www/vhosts/popsapp.com/httpdocs"',
        options: {
          stdout: true
        }
      },
      syncDev: {
        command: 'rsync -r -v -z -o  <%= buildDir %>/application <%= buildDir %>/assets <%= buildDir %>/index.php <%= gruntUser %>@popsapp.com:/var/www/vhosts/popsapp.com/dev.popsapp.com',
        
      },
      syncLive: {
        command: 'rsync -r -v -z -o  <%= buildDir %>/application <%= buildDir %>/assets <%= buildDir %>/index.php <%= gruntUser %>@popsapp.com:/var/www/vhosts/popsapp.com/httpdocs',
        
      },
      syncDevWeb: {
        command: 'rsync -r -v -z -o  web/application web/assets web/index.php <%= gruntUser %>@popsapp.com:/var/www/vhosts/popsapp.com/dev.popsapp.com',
        
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [

    'copy',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
  ]);

  grunt.registerTask('syncdev', ['shell:syncDev', 'shell:updatePermsDev']);
  grunt.registerTask('synclive', ['shell:syncLive', 'shell:updatePermsLive']);
  grunt.registerTask('syncdevweb', ['shell:syncDevWeb', 'shell:updatePermsDev']);
  //grunt.registerTask('syncliveweb', ['shell:syncLiveWeb', 'shell:updatePermsLive']);

  grunt.registerTask('build', [

    'copy',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'shell:syncDev',
    'shell:updatePermsDev'
  ]);

  grunt.registerTask('release', [

    'bump',
    'copy',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'shell:syncLive', 'shell:updatePermsLive'
  ]);

};