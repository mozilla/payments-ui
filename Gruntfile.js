module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true,
      },
      all: ['public/**/*.js', 'test/**/*.js'],
    },

    devserver: {
      options: {
        base: 'styleguide/build',
        type: 'http',
        port: grunt.option('port') || 4000,
      },
      server: {}
    },

    'gh-pages': {
      options: {
        base: 'styleguide/build',
        message: 'Updating docs',
        repo: 'git@github.com:mozilla/payments-ui.git'
      },
      src: ['**']
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/css/main.css': 'public/scss/main.scss'
        }
      }
    },

    // Styleguide builder task.
    cog: {
      styleguide: {
        src: 'styleguide',
        options: {
          sourcecodeSelector: 'main',
          templateGlobals: {
            'projectName': 'Payments UI Styleguide',
            // This is the path from the iframe folder to
            // the static dir.
            'appMedia': '../static/public'
          },
          templateConfig: {
            templatePaths: ['templates'],
          },
          copy: [
            // src is relative to the styleguide project example.
            {src: '../public/', target: 'static/public'},
          ],
        }
      }
    },

    copy: {
      nodedeps: {
        files: [{
            cwd: 'node_modules/normalize.css/',
            expand: true,
            src: 'normalize.css',
            dest: 'public/scss/lib/',
            ext: '.scss',
          }, {
            cwd: 'node_modules/braintree-web/dist/',
            expand: true,
            src: 'braintree.js',
            dest: 'public/lib/js/',
            filter: 'isFile',
            ext: '.min.js'
          }, {
            cwd: 'node_modules/card-validator/dist/js',
            expand: true,
            src: 'app.built.min.js',
            dest: 'public/lib/js/',
            // Currently card validator doesn't ship dist. This check
            // looks for the prescence of the src.
            filter: 'isFile',
            rename: function(dest, src) {
              return dest + 'card-validator.min.js';
            }
          }, {
            cwd: 'node_modules/connect-fonts-clearsans/fonts/default/',
            expand: true,
            src: '*',
            dest: 'public/fonts/clearsans/',
          }, {
            cwd: 'node_modules/connect-fonts-firasans/fonts/default/',
            expand: true,
            src: '*',
            dest: 'public/fonts/firasans/',
          }, {
            cwd: 'node_modules/jquery/dist',
            expand: true,
            src: 'jquery.min.js',
            dest: 'public/lib/js/',
          }, {
            cwd: 'node_modules/requirejs/',
            expand: true,
            src: 'require.js',
            dest: 'public/lib/js/',
        }]
      }
    },

    svg_sprite: {
      cardicons: {
        // Target basics
        expand: true,
        cwd: 'node_modules/payment-icons/min/flat',
        src: ['*.svg'],
        dest: 'public',

        options: {
          shape: {
            dimension: {
              maxWidth: 40,
              maxHeight: 40,
            }
          },
          mode: {
            css: {
              layout: 'vertical',
              common: 'card-icon',
              dimensions: true,
              padding: 10,
              prefix: '.cctype-%s',
              dest: 'scss',
              sprite: '../img/cardicons-sprite.svg',
              bust: false,
              render: {
                scss: {
                  dest: '_cardicons-sprite.scss',
                }
              }
            }
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('cog');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-svg-sprite');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build-docs', ['sass', 'cog']);
  grunt.registerTask('publish-docs', ['build-docs', 'gh-pages']);
};
