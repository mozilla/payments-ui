var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: {
    webpack: webpackConfig,
    publicPath: "/" + webpackConfig.output.publicPath,
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
