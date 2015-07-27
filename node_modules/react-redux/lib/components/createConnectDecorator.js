'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createConnectDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

var _utilsShallowEqualScalar = require('../utils/shallowEqualScalar');

var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

function createConnectDecorator(React, Connector) {
  var Component = React.Component;

  return function connect(select) {
    return function (DecoratedComponent) {
      return (function (_Component) {
        function ConnectorDecorator() {
          _classCallCheck(this, ConnectorDecorator);

          _Component.apply(this, arguments);
        }

        _inherits(ConnectorDecorator, _Component);

        ConnectorDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
          return !_utilsShallowEqualScalar2['default'](this.props, nextProps);
        };

        ConnectorDecorator.prototype.render = function render() {
          var _this = this;

          return React.createElement(
            Connector,
            { select: function (state) {
                return select(state, _this.props);
              } },
            function (stuff) {
              return React.createElement(DecoratedComponent, _extends({}, stuff, _this.props));
            }
          );
        };

        _createClass(ConnectorDecorator, null, [{
          key: 'displayName',
          value: 'Connector(' + _utilsGetDisplayName2['default'](DecoratedComponent) + ')',
          enumerable: true
        }, {
          key: 'DecoratedComponent',
          value: DecoratedComponent,
          enumerable: true
        }]);

        return ConnectorDecorator;
      })(Component);
    };
  };
}

module.exports = exports['default'];