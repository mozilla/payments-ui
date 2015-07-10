'use strict';


module.exports = function(grunt) {
  grunt.loadNpmTasks('cog');
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/*.js',
    },
  });

  grunt.initConfig(configs);

  grunt.registerTask('copy-deps', ['clean:deps', 'copy']);
  grunt.registerTask('build-styleguide', ['sass', 'webpack:styleguide', 'cog']);
  grunt.registerTask('publish-styleguide',
                     ['build-styleguide', 'gh-pages:styleguide']);
   grunt.registerTask('styleguide',
                     ['build-styleguide', 'devserver']);

  grunt.registerTask('publish-docker', function() {
    // Require the build
    this.requires(['build']);

    if (process.env.TRAVIS === 'true' &&
        process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.TRAVIS_PULL_REQUEST === 'false') {
      grunt.log.writeln('Pushing branch for docker build');
      grunt.task.run('gh-pages:docker');
    }
    else {
      grunt.log.writeln('Skipped docker deployment');
    }
  });

  // Conditionally run saucelabs tests if we have the
  // secure vars or a normal test run if not.
  grunt.registerTask('test-ci', function() {
    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true') {
      grunt.log.writeln('Running full SauceLabs test suite');
      grunt.task.run('test-sauce');
    } else {
      grunt.log.writeln('Running limited test suite');
      grunt.task.run('test');
    }
  });

  grunt.registerTask('serve',
                     ['sass:dev', 'webpack-dev-server:start', 'watch:sass']);
  grunt.registerTask('start', ['sass:dev', 'webpack:dev', 'watch:sass']);
  grunt.registerTask('build', ['clean:dist', 'sass', 'webpack']);
  grunt.registerTask('test', ['karma:run', 'eslint', 'csslint:lax']);
  grunt.registerTask('test-sauce', ['karma:sauce', 'eslint', 'csslint:lax']);
};
