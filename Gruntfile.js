/**
 * Gruntfile for the Solitaire Webapp project. Automates and tests builds 
 * for development and production.
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    paths : {
      bowerSrc : 'bower_components',
      devOut : 'devbuild',
      prodOut : 'prodbuild'
    },

    /* 
      First we compile the Bootstrap CSS files into the proper directory
      Note: it also does not compress the CSS here!
    */
    less : {
      dev : {
        options : {
          paths: ['src/less', '<%= paths.bowerSrc %>/bootstrap/less']
        },
        files : {
          '<%= paths.devOut %>/css/bootstrap.css' : 'src/less/main.less'
        }
      },
      prod : {
        options : {
          paths: ['src/less', '<%= paths.bowerSrc %>/bootstrap/less']
        },
        files : {
          '<%= paths.prodOut %>/css/bootstrap.css' : 'src/less/main.less'
        }
      }
    },

    /* Copy Bootstrap font files */
    copy : {
      dev : {
        expand : true,
        cwd : '<%= paths.bowerSrc %>/bootstrap/dist/fonts/',
        src : '*.*',
        dest : '<%= paths.devOut %>/fonts/'
      },
      prod : {
        expand : true,
        cwd : '<%= paths.bowerSrc %>/bootstrap/dist/fonts/',
        src : '*.*',
        dest : '<%= paths.prodOut %>/fonts/'
      }
    },

    /* Eventually I want to get Grunt to re-compile the complete Bootstrap source first before doing the above. */

    /* Next we want to get all our JS dependencies brought into our JS folder */
    bower_concat: {
      dev : {
        // Dev assets go to /src
        dest : "<%= paths.devOut %>/js/assets.js",
        mainFiles : {
          'joii' : [
            'src/joii.js'
          ]
        },
        include : [
          'joii',
          'jquery',
          'bootstrap'
        ]
      },
      prod : {
        // Dist assets go to /bin
        dest : "<%= paths.prodOut %>/js/assets.js",
        mainFiles : {
          'joii' : [
            'src/joii.js'
          ]
        },
        include : [
          'joii',
          'jquery',
          'bootstrap'
        ]
      }
    },

    /* Concatanate all source JS files into a single application */
    concat : {
      options : {
        separator : ';'
      },
      dev: {
        // Dev assets go to /src
        src: 'src/js/*.js',
        dest: '<%= paths.devOut %>/js/solitaire-webapp.js'
      },
      prod: {
        // Dist assets go to /bin
        src: 'src/js/*.js',
        dest: '<%= paths.prodOut %>/js/solitaire-webapp.js'
      }
    },

    /* Minify files for production */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle : false
      },
      prod : {
        files: [{
          expand: true,
          cwd: '<%= paths.prodOut %>/js/',
          src: '*.js',
          dest: '<%= paths.prodOut %>/js/',
          ext: '.min.js'
        }]
      }
    },

    /* Set Up QUnit tests */
    qunit : {
      options : {
        httpBase : 'http://localhost:8088'
      },
      test : {
        src : [ 'unit-tests/**/*.html' ]
      }
    },

    connect : {
      /* Our qunit unit tests need a server to run on, so build one */
      unitTests : {
        options : {
          hostname : 'localhost',
          port: 8088,
          base : '.'
        }
      }
    },

    /* Set up our linter for JS files */
    jshint : {
      options : {
        curly : true, /* Force curly braces where optional */
        jquery : true /* Make jQuery globals available */
      },
      dev : {
        src : [
          'dev_server.js',
          'Gruntfile.js',
          'src/js/*.js',
          'unit-tests/**/*.js'
        ]
      }
    }
  });

  // Load up all appropriate Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  /* Register our tasks */

  // The development build will lint all JS, compile CSS from source, copy fonts, concatinate all dependency JS, and concatinate project source JS.
  grunt.registerTask('dev', ['jshint:dev', 'less:dev', 'copy:dev', 'bower_concat:dev', 'concat:dev']);

  // The test build will build the development source and unit test that.
  grunt.registerTask('test', ['dev', 'connect:unitTests', 'qunit:test']);  

  // Our production build will first unit test all development code before producing production output.
  grunt.registerTask('build', ['test', 'less:prod', 'copy:prod', 'bower_concat:prod', 'concat:prod', 'uglify:prod']);

};