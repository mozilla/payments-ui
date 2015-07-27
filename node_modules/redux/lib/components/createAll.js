'use strict';

exports.__esModule = true;
exports['default'] = createAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createProvider = require('./createProvider');

var _createProvider2 = _interopRequireDefault(_createProvider);

var _createProvideDecorator = require('./createProvideDecorator');

var _createProvideDecorator2 = _interopRequireDefault(_createProvideDecorator);

var _createConnector = require('./createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

var _createConnectDecorator = require('./createConnectDecorator');

var _createConnectDecorator2 = _interopRequireDefault(_createConnectDecorator);

function createAll(React) {
  // Wrapper components
  var Provider = _createProvider2['default'](React);
  var Connector = _createConnector2['default'](React);

  // Higher-order components (decorators)
  var provide = _createProvideDecorator2['default'](React, Provider);
  var connect = _createConnectDecorator2['default'](React, Connector);

  return { Provider: Provider, Connector: Connector, provide: provide, connect: connect };
}

module.exports = exports['default'];