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
    host: 'localhost',
    contentBase: 'public/',
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/dist/',
  },
  start: {
    webpack: newWebpackConfig,
  }
};
