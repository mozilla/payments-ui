// Webpack tests entry point. Bundles all the test files
// into a single file.
// See: https://github.com/webpack/karma-webpack#alternative-usage
import 'babel-core/polyfill';

var context = require.context('.', true, /.*?test\..*?.jsx?$/);
context.keys().forEach(context);
