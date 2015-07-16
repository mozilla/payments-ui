'use strict';

/* This is the shared karma config */

var merge = require('lodash.merge');
var RewirePlugin = require('rewire-webpack');
var webpackConfig = require('./webpack.config');


var newWebpackConfig = merge({}, webpackConfig);
// Remove the bits from the shared config
// that we don't want for tests.
delete newWebpackConfig.output;
delete newWebpackConfig.entry;

// Add this just for testing:
newWebpackConfig.plugins = [
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
  webpack: newWebpackConfig,
  webpackServer: {
    noInfo: true,
  },
};
