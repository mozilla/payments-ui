var path = require('path');
var webpack = require('webpack');

var webpackConfig = require('../webpack.config.js');


module.exports = {
  options: webpackConfig,
  dev: {
    // Default to all the options in webpackConfig
  },
  prod: {
    output: {
      path: path.join(__dirname, '../public/dist/'),
      filename: '[name].bundle.min.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
  },
  styleguide: {
    entry: {
      // Explicit entries for the styleguide.
      'app-error': './styleguide/jsx/app-error',
      'card-form': './styleguide/jsx/card-form',
      'spinner': './styleguide/jsx/spinner',
    },
    output: {
      path: path.join(__dirname, '../styleguide/jsx-bundles/'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
    },
  }
};
