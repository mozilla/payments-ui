'use strict';

var merge = require('lodash.merge');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');

// Update webpack config with hot module loading config.
var newWebpackConfig = merge({}, webpackConfig);
newWebpackConfig.devtool = 'eval';
newWebpackConfig.plugins.push(new webpack.NoErrorsPlugin());
newWebpackConfig.module.loaders[0].loaders.unshift('react-hot');


module.exports = {
  options: {
    host: '0.0.0.0',
    inline: true,
    hot: true,
    publicPath: '/dist/',
    contentBase: 'public/',
    historyApiFallback: true,
  },
  start: {
    webpack: newWebpackConfig,
  }
};
