'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createProvider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = require('../utils/createStoreShape');

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

function createProvider(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

  return (function (_Component) {
    function Provider(props, context) {
      _classCallCheck(this, Provider);

      _Component.call(this, props, context);
      this.state = { store: props.store };
    }

    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      return { store: this.state.store };
    };

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var store = this.state.store;
      var nextStore = nextProps.store;

      if (store !== nextStore) {
        var nextReducer = nextStore.getReducer();
        store.replaceReducer(nextReducer);
      }
    };

    Provider.prototype.render = function render() {
      var children = this.props.children;

      return children();
    };

    _createClass(Provider, null, [{
      key: 'childContextTypes',
      value: {
        store: storeShape.isRequired
      },
      enumerable: true
    }, {
      key: 'propTypes',
      value: {
        children: PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    return Provider;
  })(Component);
}

module.exports = exports['default'];