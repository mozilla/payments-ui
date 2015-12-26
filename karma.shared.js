'use strict';

/* This is the shared karma config */
var merge = require('lodash.merge');
var webpackConfig = require('./webpack.config');

var newWebpackConfig = merge({}, webpackConfig);
// Remove the bits from the shared config
// that we don't want for tests.
delete newWebpackConfig.output;
delete newWebpackConfig.entry;

newWebpackConfig.plugins = [];

// Expose the right kind of source map for test-loader.js
newWebpackConfig.devtool = 'inline-source-map';

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
    quiet: true,
  },
};
