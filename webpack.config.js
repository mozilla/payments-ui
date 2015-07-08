'use strict';

var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './public/js/main.js',
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: 'js/',
    sourceMapFilename: '[file].map',
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.jsx?$/,
        // Stage 1 to enable ES7 rest properties.
        // eg: let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
        loader: 'babel?stage=1',
      },
    ],
  },
  resolve: {
    // you can now require('file') instead of require('file.json')
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'public/js/',
      'node_modules',
      'node_modules/mozilla-payments-config/json/products/',
    ],
  },

};
