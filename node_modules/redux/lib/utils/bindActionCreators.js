'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMapValues = require('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

function bindActionCreators(actionCreators, dispatch) {
  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
    return function () {
      return dispatch(actionCreator.apply(undefined, arguments));
    };
  });
}

module.exports = exports['default'];