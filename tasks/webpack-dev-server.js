var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: {
    webpack: webpackConfig,
    publicPath: '/' + webpackConfig.output.publicPath,
    filename: 'bundle.js',
    contentBase: 'public'
  },
  start: {
    keepAlive: false,
    webpack: {
      devtool: 'eval',
      debug: true
    }
  }
};
