'use strict';

var webpackConfig = require('./webpack.config.js');

// Remove the bits from the shared config
// that we don't want for tests.
delete webpackConfig.output;
delete webpackConfig.entry;


module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Firefox'],
    colors: true,
    singleRun: true,
    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],
    files: [
      'tests/test-loader.js',
    ],
    preprocessors: {
      'tests/test-loader.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    plugins: [
      'karma-sinon',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-firefox-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
  });
};
