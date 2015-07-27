'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _utilsIsPlainObject = require('./utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var Store = (function () {
  function Store(reducer, initialState) {
    _classCallCheck(this, Store);

    _invariant2['default'](typeof reducer === 'function', 'Expected the reducer to be a function.');

    this.state = initialState;
    this.listeners = [];
    this.replaceReducer(reducer);
  }

  Store.prototype.getReducer = function getReducer() {
    return this.reducer;
  };

  Store.prototype.replaceReducer = function replaceReducer(nextReducer) {
    this.reducer = nextReducer;
    this.dispatch({ type: '@@INIT' });
  };

  Store.prototype.dispatch = function dispatch(action) {
    _invariant2['default'](_utilsIsPlainObject2['default'](action), 'Actions must be plain objects. Use custom middleware for async actions.');

    var reducer = this.reducer;

    this.state = reducer(this.state, action);
    this.listeners.forEach(function (listener) {
      return listener();
    });
    return action;
  };

  Store.prototype.getState = function getState() {
    return this.state;
  };

  Store.prototype.subscribe = function subscribe(listener) {
    var listeners = this.listeners;

    listeners.push(listener);

    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return Store;
})();

exports['default'] = Store;
module.exports = exports['default'];