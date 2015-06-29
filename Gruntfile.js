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
  grunt.registerTask('build-docs', ['sass', 'cog']);
  grunt.registerTask('publish-styleguide',
                     ['build-docs', 'gh-pages:styleguide']);

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

  grunt.registerTask('serve',
                     ['sass', 'webpack-dev-server:start', 'watch:sass']);
  grunt.registerTask('start', ['sass', 'webpack', 'watch:sass']);
  grunt.registerTask('build', ['clean:dist', 'sass', 'webpack']);
  grunt.registerTask('test', ['karma:run', 'eslint']);
};
