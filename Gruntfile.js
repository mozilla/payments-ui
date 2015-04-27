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
        message: 'Updating docs'
      },
      src: ['**']
    },

    // Styleguide builder task.
    cog: {
      styleguide: {
        src: 'styleguide',
        options: {
          sourcecodeSelector: 'main',
          templateGlobals: {
            'projectName': 'Payments UI Styleguide',
          },
          templateConfig: {
            templatePaths: ['templates'],
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('cog');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('publish-docs', ['cog', 'gh-pages']);
};
