var path = require('path');

module.exports = {
  entry: './public/js/main.js',
  output: {
    path: path.join(__dirname, 'public/js/'),
    filename: 'bundle.js',
    publicPath: 'js/',
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.json')
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['public/js/', 'public/jsx/', 'node_modules'],
  }
};
