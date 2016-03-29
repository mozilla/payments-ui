'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'management': './public/js/apps/management/main.jsx',
    'transaction': './public/js/apps/transaction/main.jsx',
  },
  failOnError: true,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    sourceMapFilename: '[file].map',
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.jsx?$/,
        // es7.objectRestSpread to enable ES7 rest spread operators
        // eg: let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
        loaders: ['babel?optional[]=es7.objectRestSpread&optional[]=es7.classProperties&stage=2'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons.js',
                                            ['management', 'transaction']),
  ],
  resolve: {
    // you can now require('file') instead of require('file.json')
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'public/js/',
      'node_modules',
      'node_modules/mozilla-payments-config/json/products/',
    ],
  },
  stats: {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true,
  },
  watch: true,
};
