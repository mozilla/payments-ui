var webpack = require('webpack');
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
      'chai'
    ],
    files: [
      'tests/test.index.js',
      { pattern: 'tests/**/test*.jsx', included: false, served: false, watched: true }
    ],
    preprocessors: {
      'tests/test.index.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-firefox-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ]
  });
};
