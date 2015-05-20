'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('cog');
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  grunt.registerTask('copy-deps', ['clean', 'copy']);
  grunt.registerTask('build-docs', ['sass', 'cog']);
  grunt.registerTask('publish-docs', ['build-docs', 'gh-pages']);
  grunt.registerTask('serve',
                     ['sass', 'webpack-dev-server:start', 'watch:sass']);
  grunt.registerTask('start', ['sass', 'webpack', 'watch:sass']);
  grunt.registerTask('test', ['karma:run', 'eslint']);
};
