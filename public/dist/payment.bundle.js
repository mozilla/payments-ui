webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _tracking = __webpack_require__(252);
	
	var _tracking2 = _interopRequireDefault(_tracking);
	
	var _app = __webpack_require__(267);
	
	// Common ajax settings.
	_jquery2['default'].ajaxSetup({
	  dataType: 'json'
	});
	
	_tracking2['default'].init();
	(0, _app.init)();

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	exports.init = init;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	__webpack_require__(8);
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(171);
	
	var _redux = __webpack_require__(183);
	
	var _dataStore = __webpack_require__(195);
	
	var _dataStore2 = _interopRequireDefault(_dataStore);
	
	var _componentsError = __webpack_require__(256);
	
	var _componentsError2 = _interopRequireDefault(_componentsError);
	
	var _viewsLogin = __webpack_require__(268);
	
	var _viewsLogin2 = _interopRequireDefault(_viewsLogin);
	
	var _viewsPurchase = __webpack_require__(269);
	
	var _viewsPurchase2 = _interopRequireDefault(_viewsPurchase);
	
	var _actionsUser = __webpack_require__(204);
	
	var userActions = _interopRequireWildcard(_actionsUser);
	
	var _utils = __webpack_require__(206);
	
	var PaymentApp = (function (_Component) {
	  _inherits(PaymentApp, _Component);
	
	  _createClass(PaymentApp, null, [{
	    key: 'propTypes',
	    value: {
	      Login: _react.PropTypes.func.isRequired,
	      Purchase: _react.PropTypes.func.isRequired,
	      win: _react.PropTypes.object
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      Login: _viewsLogin2['default'],
	      Purchase: _viewsPurchase2['default'],
	      win: window
	    },
	    enumerable: true
	  }]);
	
	  function PaymentApp(props) {
	    _classCallCheck(this, PaymentApp);
	
	    _get(Object.getPrototypeOf(PaymentApp.prototype), 'constructor', this).call(this, props);
	    var qs = (0, _utils.parseQuery)(props.win.location.href);
	    // TODO: we should validate/clean this input to raise early errors.
	    this.state = {
	      accessToken: qs.access_token,
	      productId: qs.product
	    };
	  }
	
	  _createClass(PaymentApp, [{
	    key: 'selectData',
	    value: function selectData(state) {
	      return {
	        app: state.app,
	        user: state.user
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var state = this.state;
	      var Login = this.props.Login;
	      var Purchase = this.props.Purchase;
	
	      return _react2['default'].createElement(
	        'main',
	        null,
	        _react2['default'].createElement(
	          _reactRedux.Connector,
	          { select: this.selectData },
	          function (connector) {
	            if (connector.app.error) {
	              console.log('rendering app error');
	              return _react2['default'].createElement(_componentsError2['default'], { error: connector.app.error });
	            } else if (!connector.user.signedIn) {
	              console.log('rendering login');
	              return _react2['default'].createElement(Login, _extends({
	                accessToken: state.accessToken
	              }, (0, _redux.bindActionCreators)(userActions, connector.dispatch)));
	            } else {
	              console.log('rendering purchase flow');
	              return _react2['default'].createElement(Purchase, {
	                productId: state.productId,
	                user: connector.user
	              });
	            }
	          }
	        )
	      );
	    }
	  }]);
	
	  return PaymentApp;
	})(_react.Component);
	
	exports['default'] = PaymentApp;
	
	function init() {
	  _react2['default'].render(_react2['default'].createElement(
	    _reactRedux.Provider,
	    { store: _dataStore2['default'] },
	    function () {
	      return _react2['default'].createElement(PaymentApp, null);
	    }
	  ), document.body);
	}

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsSpinner = __webpack_require__(254);
	
	var _componentsSpinner2 = _interopRequireDefault(_componentsSpinner);
	
	var _utils = __webpack_require__(206);
	
	var _tracking = __webpack_require__(252);
	
	var _tracking2 = _interopRequireDefault(_tracking);
	
	var Login = (function (_Component) {
	  _inherits(Login, _Component);
	
	  function Login() {
	    _classCallCheck(this, Login);
	
	    _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Login, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _tracking2['default'].setPage('/login');
	      this.props.tokenSignIn(this.props.accessToken);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_componentsSpinner2['default'], { text: (0, _utils.gettext)('Signing in') });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      accessToken: _react.PropTypes.string.isRequired,
	      tokenSignIn: _react.PropTypes.func.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return Login;
	})(_react.Component);
	
	exports['default'] = Login;
	module.exports = exports['default'];

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(183);
	
	var _reactRedux = __webpack_require__(171);
	
	var _actionsTransaction = __webpack_require__(7);
	
	var transactionActions = _interopRequireWildcard(_actionsTransaction);
	
	var _actionsUser = __webpack_require__(204);
	
	var userActions = _interopRequireWildcard(_actionsUser);
	
	var _actionsSubscriptions = __webpack_require__(3);
	
	var subscriptionActions = _interopRequireWildcard(_actionsSubscriptions);
	
	var _viewsAddSubscription = __webpack_require__(270);
	
	var _viewsAddSubscription2 = _interopRequireDefault(_viewsAddSubscription);
	
	var _viewsCardListing = __webpack_require__(272);
	
	var _viewsCardListing2 = _interopRequireDefault(_viewsCardListing);
	
	var _viewsCompletePayment = __webpack_require__(274);
	
	var _viewsCompletePayment2 = _interopRequireDefault(_viewsCompletePayment);
	
	var _viewsBraintreeToken = __webpack_require__(253);
	
	var _viewsBraintreeToken2 = _interopRequireDefault(_viewsBraintreeToken);
	
	var Purchase = (function (_Component) {
	  _inherits(Purchase, _Component);
	
	  function Purchase() {
	    _classCallCheck(this, Purchase);
	
	    _get(Object.getPrototypeOf(Purchase.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Purchase, [{
	    key: 'selectData',
	    value: function selectData(state) {
	      return {
	        transaction: state.transaction,
	        user: state.user
	      };
	    }
	  }, {
	    key: 'renderChild',
	    value: function renderChild(connector) {
	      var props = this.props;
	      var BraintreeToken = props.BraintreeToken;
	      var CompletePayment = props.CompletePayment;
	      var CardListing = props.CardListing;
	      var AddSubscription = props.AddSubscription;
	
	      if (connector.transaction.completed) {
	        return _react2['default'].createElement(CompletePayment, {
	          productId: props.productId,
	          userEmail: props.user.email });
	      } else if (connector.transaction.availablePayMethods.length > 0) {
	        console.log('rendering card listing');
	        return _react2['default'].createElement(CardListing, _extends({
	          productId: props.productId,
	          payMethods: connector.transaction.availablePayMethods
	        }, (0, _redux.bindActionCreators)(transactionActions, connector.dispatch)));
	      } else if (!connector.user.braintreeToken) {
	        console.log('Retreiving Braintree Token');
	        return _react2['default'].createElement(BraintreeToken, (0, _redux.bindActionCreators)(userActions, connector.dispatch));
	      } else {
	        console.log('rendering card entry');
	
	        var _bindActionCreators = (0, _redux.bindActionCreators)(subscriptionActions, connector.dispatch);
	
	        var createSubscription = _bindActionCreators.createSubscription;
	
	        return _react2['default'].createElement(AddSubscription, {
	          cardSubmissionErrors: connector.transaction.cardSubmissionErrors,
	          braintreeToken: connector.user.braintreeToken,
	          createSubscription: createSubscription,
	          productId: props.productId
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      return _react2['default'].createElement(
	        _reactRedux.Connector,
	        { select: this.selectData },
	        function (connector) {
	          return _this.renderChild(connector);
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      AddSubscription: _react.PropTypes.func.isRequired,
	      BraintreeToken: _react.PropTypes.func.isRequired,
	      CardListing: _react.PropTypes.func.isRequired,
	      CompletePayment: _react.PropTypes.func.isRequired,
	      productId: _react.PropTypes.string.isRequired,
	      user: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      AddSubscription: _viewsAddSubscription2['default'],
	      CardListing: _viewsCardListing2['default'],
	      CompletePayment: _viewsCompletePayment2['default'],
	      BraintreeToken: _viewsBraintreeToken2['default']
	    },
	    enumerable: true
	  }]);
	
	  return Purchase;
	})(_react.Component);
	
	exports['default'] = Purchase;
	module.exports = exports['default'];

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsCardForm = __webpack_require__(210);
	
	var _componentsCardForm2 = _interopRequireDefault(_componentsCardForm);
	
	var _componentsProductDetail = __webpack_require__(271);
	
	var _componentsProductDetail2 = _interopRequireDefault(_componentsProductDetail);
	
	var _tracking = __webpack_require__(252);
	
	var _tracking2 = _interopRequireDefault(_tracking);
	
	var _utils = __webpack_require__(206);
	
	var AddSubscription = (function (_Component) {
	  _inherits(AddSubscription, _Component);
	
	  function AddSubscription() {
	    _classCallCheck(this, AddSubscription);
	
	    _get(Object.getPrototypeOf(AddSubscription.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(AddSubscription, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _tracking2['default'].setPage('/add-subscription');
	    }
	  }, {
	    key: 'handleCardSubmit',
	    value: function handleCardSubmit(creditCard) {
	      console.log('submitting credit card to sign up for subscription', this.props.productId);
	      this.props.createSubscription(this.props.braintreeToken, this.props.productId, creditCard);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      return _react2['default'].createElement(
	        'div',
	        { className: "card-details" },
	        _react2['default'].createElement(_componentsProductDetail2['default'], { productId: this.props.productId }),
	        _react2['default'].createElement(_componentsCardForm2['default'], {
	          submissionErrors: this.props.cardSubmissionErrors,
	          submitPrompt: (0, _utils.gettext)('Subscribe'),
	          handleCardSubmit: function (card) {
	            return _this.handleCardSubmit(card);
	          },
	          id: "braintree-form",
	          method: "post"
	        })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      braintreeToken: _react.PropTypes.string.isRequired,
	      cardSubmissionErrors: _react.PropTypes.object,
	      createSubscription: _react.PropTypes.func.isRequired,
	      productId: _react.PropTypes.string.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return AddSubscription;
	})(_react.Component);
	
	exports['default'] = AddSubscription;
	module.exports = exports['default'];

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _products = __webpack_require__(261);
	
	var products = _interopRequireWildcard(_products);
	
	var _utils = __webpack_require__(206);
	
	var ProductDetail = (function (_Component) {
	  _inherits(ProductDetail, _Component);
	
	  function ProductDetail() {
	    _classCallCheck(this, ProductDetail);
	
	    _get(Object.getPrototypeOf(ProductDetail.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(ProductDetail, [{
	    key: 'render',
	    value: function render() {
	
	      var productData = products.get(this.props.productId);
	
	      return _react2['default'].createElement(
	        'div',
	        { className: "product" },
	        _react2['default'].createElement(
	          'h1',
	          { className: "title" },
	          productData.seller.name.en
	        ),
	        _react2['default'].createElement(
	          'div',
	          null,
	          productData.description.en
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: "price" },
	          productData.price.en
	        ),
	        _react2['default'].createElement(
	          'div',
	          null,
	          (0, _utils.gettext)('per month')
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      productId: _react.PropTypes.string.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return ProductDetail;
	})(_react.Component);
	
	exports['default'] = ProductDetail;
	module.exports = exports['default'];

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsCardChoice = __webpack_require__(273);
	
	var _componentsCardChoice2 = _interopRequireDefault(_componentsCardChoice);
	
	var _componentsProductDetail = __webpack_require__(271);
	
	var _componentsProductDetail2 = _interopRequireDefault(_componentsProductDetail);
	
	var _utils = __webpack_require__(206);
	
	var _tracking = __webpack_require__(252);
	
	var _tracking2 = _interopRequireDefault(_tracking);
	
	var CardListing = (function (_Component) {
	  _inherits(CardListing, _Component);
	
	  function CardListing() {
	    _classCallCheck(this, CardListing);
	
	    _get(Object.getPrototypeOf(CardListing.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(CardListing, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _tracking2['default'].setPage('/card-listing');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: "card-listing" },
	        _react2['default'].createElement(_componentsProductDetail2['default'], { productId: this.props.productId }),
	        _react2['default'].createElement(_componentsCardChoice2['default'], {
	          cards: this.props.payMethods,
	          productId: this.props.productId
	        }),
	        _react2['default'].createElement(
	          'a',
	          { className: "card-add bottom-link", href: "#",
	            onClick: this.props.payWithNewCard },
	          (0, _utils.gettext)('Add new credit card')
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      payMethods: _react.PropTypes.array.isRequired,
	      payWithNewCard: _react.PropTypes.func.isRequired,
	      productId: _react.PropTypes.string.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return CardListing;
	})(_react.Component);
	
	exports['default'] = CardListing;
	module.exports = exports['default'];

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsCardList = __webpack_require__(265);
	
	var _componentsCardList2 = _interopRequireDefault(_componentsCardList);
	
	var _componentsSubmitButton = __webpack_require__(251);
	
	var _componentsSubmitButton2 = _interopRequireDefault(_componentsSubmitButton);
	
	var _utils = __webpack_require__(206);
	
	var _actionsTransaction = __webpack_require__(7);
	
	var transactionActions = _interopRequireWildcard(_actionsTransaction);
	
	var _dataStore = __webpack_require__(195);
	
	var _dataStore2 = _interopRequireDefault(_dataStore);
	
	var CardChoice = (function (_Component) {
	  _inherits(CardChoice, _Component);
	
	  _createClass(CardChoice, null, [{
	    key: 'propTypes',
	    value: {
	      cards: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	        id: _react.PropTypes.number,
	        resource_uri: _react.PropTypes.string,
	        truncated_id: _react.PropTypes.string,
	        type_name: _react.PropTypes.string
	      })).isRequired,
	      productId: _react.PropTypes.string.isRequired
	    },
	    enumerable: true
	  }]);
	
	  function CardChoice(props) {
	    var _this = this;
	
	    _classCallCheck(this, CardChoice);
	
	    _get(Object.getPrototypeOf(CardChoice.prototype), 'constructor', this).call(this, props);
	
	    this.handleSubmit = function (e) {
	      e.preventDefault();
	
	      _this.setState({ isSubmitting: true });
	
	      _jquery2['default'].ajax({
	        data: {
	          pay_method_uri: _this.state.card,
	          plan_id: _this.props.productId
	        },
	        url: '/api/braintree/subscriptions/',
	        method: 'post',
	        dataType: 'json',
	        context: _this
	      }).done(function () {
	        console.log('Successfully subscribed with existing card');
	
	        _dataStore2['default'].dispatch(transactionActions.complete());
	      }).fail(function () {
	        // TODO: handler errors.
	      });
	    };
	
	    this.handleCardChange = function (e) {
	      _this.setState({ card: e.target.value });
	    };
	
	    this.state = {
	      isSubmitting: false,
	      card: this.props.cards.length === 1 ? this.props.cards[0].resource_uri : null
	    };
	  }
	
	  _createClass(CardChoice, [{
	    key: 'render',
	    value: function render() {
	      var cardData = this.props.cards;
	      for (var i = 0; i < cardData.length; i += 1) {
	        var card = cardData[i];
	        card.checked = this.state.card === card.resource_uri;
	      }
	
	      var formIsValid = this.state.card !== null;
	
	      return _react2['default'].createElement(
	        'form',
	        { id: "card-listing", onSubmit: this.handleSubmit },
	        _react2['default'].createElement(_componentsCardList2['default'], {
	          cards: cardData,
	          onCardChange: this.handleCardChange }),
	        _react2['default'].createElement(_componentsSubmitButton2['default'], { isDisabled: !formIsValid,
	          showSpinner: this.state.isSubmitting,
	          text: (0, _utils.gettext)('Subscribe')
	        })
	      );
	    }
	  }]);
	
	  return CardChoice;
	})(_react.Component);
	
	exports['default'] = CardChoice;
	module.exports = exports['default'];

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(15);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsProductDetail = __webpack_require__(271);
	
	var _componentsProductDetail2 = _interopRequireDefault(_componentsProductDetail);
	
	var _componentsSubmitButton = __webpack_require__(251);
	
	var _componentsSubmitButton2 = _interopRequireDefault(_componentsSubmitButton);
	
	var _utils = __webpack_require__(206);
	
	var _tracking = __webpack_require__(252);
	
	var _tracking2 = _interopRequireDefault(_tracking);
	
	var CompletePayment = (function (_Component) {
	  _inherits(CompletePayment, _Component);
	
	  function CompletePayment() {
	    var _this = this;
	
	    _classCallCheck(this, CompletePayment);
	
	    _get(Object.getPrototypeOf(CompletePayment.prototype), 'constructor', this).apply(this, arguments);
	
	    this.handleClick = function (e) {
	      e.preventDefault();
	      var win = _this.props.win;
	      if (win.parent !== window) {
	        // Note: the targetOrigin is wide open.
	        // Nothing sensitive should be sent whilst
	        // that's the case.
	        console.log('Telling parent to close modal.');
	        // Stringifying the object is necessary for
	        // IE9 support.
	        win.parent.postMessage(JSON.stringify({
	          event: 'purchase-completed'
	        }), '*');
	      } else {
	        console.log('Not iframed. No-op');
	      }
	    };
	  }
	
	  _createClass(CompletePayment, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _tracking2['default'].setPage('/complete-payment');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: "complete" },
	        _react2['default'].createElement(_componentsProductDetail2['default'], { productId: this.props.productId }),
	        _react2['default'].createElement(
	          'p',
	          { className: "accepted" },
	          (0, _utils.gettext)('Payment Accepted')
	        ),
	        _react2['default'].createElement(
	          'p',
	          { className: "receipt" },
	          (0, _utils.gettext)('Your receipt has been sent to'),
	          _react2['default'].createElement(
	            'span',
	            { className: "email" },
	            this.props.userEmail
	          )
	        ),
	        _react2['default'].createElement(_componentsSubmitButton2['default'], { text: (0, _utils.gettext)('OK'),
	          onClick: this.handleClick })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      productId: _react2['default'].PropTypes.string.isRequired,
	      userEmail: _react2['default'].PropTypes.string.isRequired,
	      win: _react2['default'].PropTypes.object
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      win: window
	    },
	    enumerable: true
	  }]);
	
	  return CompletePayment;
	})(_react.Component);
	
	exports['default'] = CompletePayment;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=payment.bundle.js.map