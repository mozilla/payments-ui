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
  grunt.registerTask('styleguide', ['build-styleguide', 'devserver',
                                    'concurrent:styleguide']);

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

  grunt.registerTask('build', ['clean:dist', 'sass', 'webpack']);

  // The dev server used for live reloading in the browser.
  grunt.registerTask('serve', 'Dev server with webpack hot module reloading',
    ['clean:dist', 'sass:dev', 'webpack-dev-server:start', 'watch:sass']);
  // Used to serve email CSS.
  grunt.registerTask('watch-email',
    ['clean:dist', 'sass:email', 'webpack:dev', 'watch:sassemail']);
  // Regular grunt server, used when running inside the payments-env docker.
  grunt.registerTask('watch-static',
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

  grunt.registerTask('test', ['karma:run', 'eslint', 'csslint:lax']);

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

  grunt.registerTask('test-sauce', ['karma:sauce', 'eslint', 'csslint:lax']);
};
