var grunt = require('grunt');

module.exports = {
  options: {
    logLevel: grunt.option('log-level') || 'ERROR',
  },
  dev: {
    configFile: 'karma.conf.js',
    autoWatch: true
  },
  run: {
    configFile: 'karma.conf.js',
    singleRun: true
  },
};
