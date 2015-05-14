module.exports = function(grunt) {
  grunt.loadNpmTasks('cog');
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  grunt.registerTask('copy-deps', ['clean', 'copy']);
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build-docs', ['sass', 'cog']);
  grunt.registerTask('publish-docs', ['build-docs', 'gh-pages']);
  grunt.registerTask('start', ['webpack-dev-server:start']);
};
