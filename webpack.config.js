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
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
    ],
  },
  resolve: {
    // you can now require('file') instead of require('file.json')
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'public/js/',
      'public/jsx/',
      'node_modules',
      'node_modules/mozilla-payments-config/json/products/',
    ],
  },

};
