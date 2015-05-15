var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: {
    webpack: webpackConfig,
    publicPath: '/' + webpackConfig.output.publicPath,
    filename: 'bundle.js',
    contentBase: 'public'
  },
  start: {
    keepAlive: true,
    webpack: {
      devtool: "eval",
      debug: true
    }
  }
};
