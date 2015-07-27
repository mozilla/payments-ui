'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createProvideDecorator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

function createProvideDecorator(React, Provider) {
  var Component = React.Component;

  return function provide(store) {
    return function (DecoratedComponent) {
      return (function (_Component) {
        function ProviderDecorator() {
          _classCallCheck(this, ProviderDecorator);

          _Component.apply(this, arguments);
        }

        _inherits(ProviderDecorator, _Component);

        ProviderDecorator.prototype.render = function render() {
          var _this = this;

          return React.createElement(
            Provider,
            { store: store },
            function () {
              return React.createElement(DecoratedComponent, _this.props);
            }
          );
        };

        _createClass(ProviderDecorator, null, [{
          key: 'displayName',
          value: 'Provider(' + _utilsGetDisplayName2['default'](DecoratedComponent) + ')',
          enumerable: true
        }, {
          key: 'DecoratedComponent',
          value: DecoratedComponent,
          enumerable: true
        }]);

        return ProviderDecorator;
      })(Component);
    };
  };
}

module.exports = exports['default'];