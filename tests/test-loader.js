// Webpack tests entry point. Bundles all the test files
// into a single file.
// See: https://github.com/webpack/karma-webpack#alternative-usage
import 'babel-core/polyfill';

// silence logging in components
var logLevels = ['log', 'warn', 'info', 'error'];
logLevels.forEach(function(level) {
  console[level] = function() {};
});

var context = require.context('.', true, /.*?test\..*?.jsx?$/);
context.keys().forEach(context);
