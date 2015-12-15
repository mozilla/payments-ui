module.exports = function(grunt) {
  grunt.loadNpmTasks('cog-style-guide');
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/*.js',
    },
  });

  grunt.initConfig(configs);

  grunt.registerTask('copy-deps', 'Copy dep from node_modules into the tree',
                     ['clean:deps', 'copy']);
  grunt.registerTask('build-styleguide', 'Build the styleguide',
                     ['sass', 'webpack:styleguide', 'cog']);
  grunt.registerTask('publish-styleguide', 'Publish the styleguide to gh-pages',
                     ['build-styleguide', 'gh-pages:styleguide']);
  grunt.registerTask('watch-styleguide',
                     'Build and watch the styleguide for changes',
                     ['build-styleguide', 'devserver',
                      'concurrent:styleguide']);

  grunt.registerTask('publish-docker', 'Used by travis to push a branch with ' +
                     'built assets for docker to build from', function() {
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

  grunt.registerTask('build', ['clean:dist', 'copy-deps', 'sass', 'webpack']);
  grunt.registerTask('serve', 'Dev server with webpack hot module reloading',
    ['clean:dist', 'sass:dev', 'webpack-dev-server:start', 'watch:sass']);
  grunt.registerTask('watch-email', 'Watches and rebuilds email CSS',
    ['clean:dist', 'sass:email', 'webpack:dev', 'watch:sassemail']);
  grunt.registerTask('watch-static', 'Watches and rebuilds JS + CSS',
    ['clean:dist', 'sass:dev', 'webpack:dev', 'watch:sass']);

  // Legacy tasks still used by payments-env, see:
  // https://github.com/mozilla/payments-ui/issues/361
  grunt.registerTask('start', 'Deprecated; use `watch-static` instead',
                     function() {
    grunt.log.writeln(
      '"grunt start" is deprecated; use `grunt watch-static` instead');
    grunt.task.run('watch-static');
  });
  grunt.registerTask('start-email', 'Deprecated; use `watch-email` instead',
                     function() {
    grunt.log.writeln(
      '"grunt start-email" is deprecated; use `grunt watch-email` instead');
    grunt.task.run('watch-email');
  });

  grunt.registerTask('test', 'Run the unit tests',
                     ['karma:run', 'eslint', 'csslint:lax']);

  // Conditionally run saucelabs tests if we have the
  // secure vars or a normal test run if not.
  grunt.registerTask('test-ci', 'Used by travis to run the the tests ' +
    'conditionally on sauce-labs when credentials are present', function() {

    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true') {
      grunt.log.writeln('Running full SauceLabs test suite');
      grunt.task.run('test-sauce');
    } else {
      grunt.log.writeln('Running limited test suite');
      grunt.task.run('test');
    }
  });

  grunt.registerTask('test-sauce', 'Run the unit tests on sauce labs',
                     ['karma:sauce', 'eslint', 'csslint:lax']);
};
