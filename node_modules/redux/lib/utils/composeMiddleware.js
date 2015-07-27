'use strict';

exports.__esModule = true;
exports['default'] = composeMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

/**
 * Compose middleware from left to right
 * @param  {...Function} middlewares
 * @return {Function}
 */

function composeMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (methods) {
    return function (next) {
      return _compose2['default'].apply(undefined, middlewares.map(function (m) {
        return m(methods);
      }).concat([next]));
    };
  };
}

module.exports = exports['default'];