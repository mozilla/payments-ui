var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: webpackConfig,
  payment: {
    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true
    },
    failOnError: true, // don't report error to grunt if webpack find errors
    //watch: true, // use webpacks watcher
    //keepalive: true, // don't finish the grunt task
  },
};
