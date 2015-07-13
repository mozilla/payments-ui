'use strict';

/* This is the shared karma config */

var RewirePlugin = require('rewire-webpack');
var webpackConfig = require('./webpack.config.js');

// Remove the bits from the shared config
// that we don't want for tests.
delete webpackConfig.output;
delete webpackConfig.entry;

// Add this just for testing:
webpackConfig.plugins = [
  new RewirePlugin(),
];

module.exports = {
  basePath: '',
  browsers: ['Firefox'],
  colors: true,
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
  plugins: [
    'karma-sinon',
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-chai',
    'karma-firefox-launcher',
    'karma-sourcemap-loader',
    'karma-webpack',
  ],
  singleRun: true,
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true,
  },
};
