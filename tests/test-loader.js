// Webpack tests entry point. Bundles all the test files
// into a single file.
// See: https://github.com/webpack/karma-webpack#alternative-usage

import 'shims';

var context = require.context('.', true, /test\..*?.jsx?$/);
context.keys().forEach(context);
