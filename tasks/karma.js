var grunt = require('grunt');

module.exports = {
  options: {
    logLevel: grunt.option('log-level') || 'INFO',
  },
  dev: {
    configFile: 'karma.conf.js',
    singleRun: false,
    autoWatch: true
  },
  run: {
    configFile: 'karma.conf.js',
  },
  sauce: {
    configFile: 'karma.conf.sauce.js',
  },
};
