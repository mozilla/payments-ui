var path = require('path');
var webpack = require('webpack');

var webpackConfig = require('../webpack.config.js');


module.exports = {
  options: webpackConfig,
  dev: {
    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true
    },
    failOnError: true, // don't report error to grunt if webpack find errors
    watch: true, // use webpacks watcher
  },
  prod: {
    failOnError: true, // don't report error to grunt if webpack find errors
    output: {
      path: path.join(__dirname, '../public/dist/'),
      filename: 'bundle.min.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    watch: true, // use webpacks watcher
  }
};
