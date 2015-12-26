// Webpack tests entry point. Bundles all the test files
// into a single file.
// See: https://github.com/webpack/karma-webpack#alternative-usage
import 'babel-core/polyfill';

var logLevels = ['log', 'warn', 'info', 'error', 'debug'];
logLevels.forEach(function(level) {
  console[level] = function() {};
});

var context = require.context('.', true, /.*?test\..*?.jsx?$/);
context.keys().forEach(context);
