webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _app = __webpack_require__(2);
	
	// Common ajax settings.
	_jquery2['default'].ajaxSetup({
	  dataType: 'json'
	});
	
	(0, _app.init)();

/***/ },

/***/ 2:
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
	
	__webpack_require__(3);
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxReact = __webpack_require__(166);
	
	var _redux = __webpack_require__(179);
	
	var _reduxConfig = __webpack_require__(189);
	
	var _reduxConfig2 = _interopRequireDefault(_reduxConfig);
	
	var _actionsManagement = __webpack_require__(196);
	
	var managementActions = _interopRequireWildcard(_actionsManagement);
	
	var _viewsModalError = __webpack_require__(197);
	
	var _viewsModalError2 = _interopRequireDefault(_viewsModalError);
	
	var _viewsManagement = __webpack_require__(202);
	
	var _viewsManagement2 = _interopRequireDefault(_viewsManagement);
	
	var _viewsManageCards = __webpack_require__(204);
	
	var _viewsManageCards2 = _interopRequireDefault(_viewsManageCards);
	
	var ManagementApp = (function (_Component) {
	  _inherits(ManagementApp, _Component);
	
	  function ManagementApp() {
	    _classCallCheck(this, ManagementApp);
	
	    _get(Object.getPrototypeOf(ManagementApp.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(ManagementApp, [{
	    key: 'selectData',
	    value: function selectData(state) {
	      return {
	        management: state.management
	      };
	    }
	  }, {
	    key: 'renderChild',
	    value: function renderChild(connector) {
	      var actions = (0, _redux.bindActionCreators)(managementActions, connector.dispatch);
	      var children = [];
	      if (connector.management.error) {
	        children.push(_react2['default'].createElement(_viewsModalError2['default'], _extends({}, actions, { error: connector.management.error })));
	      } else if (connector.management.paymentMethods) {
	        children.push(_react2['default'].createElement(_viewsManageCards2['default'], _extends({}, actions, {
	          paymentMethods: connector.management.paymentMethods })));
	      }
	      children.push(_react2['default'].createElement(_viewsManagement2['default'], actions));
	      return _react2['default'].createElement(
	        'div',
	        null,
	        children
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'main',
	        null,
	        _react2['default'].createElement(
	          _reduxReact.Connector,
	          { select: this.selectData },
	          this.renderChild
	        )
	      );
	    }
	  }]);
	
	  return ManagementApp;
	})(_react.Component);
	
	exports['default'] = ManagementApp;
	
	function init() {
	  _react2['default'].render(_react2['default'].createElement(
	    _reduxReact.Provider,
	    { redux: _reduxConfig2['default'] },
	    function () {
	      return _react2['default'].createElement(ManagementApp, null);
	    }
	  ), document.body);
	}

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.error = error;
	exports.getPayMethods = getPayMethods;
	exports.closeModal = closeModal;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _constantsActionTypes = __webpack_require__(192);
	
	var actionTypes = _interopRequireWildcard(_constantsActionTypes);
	
	function error(debugMessage) {
	  return {
	    type: actionTypes.APP_ERROR,
	    error: { debugMessage: debugMessage }
	  };
	}
	
	function getPayMethods() {
	  return function (dispatch) {
	    _jquery2['default'].ajax({
	      method: 'get',
	      url: '/api/braintree/mozilla/paymethod/',
	      context: this
	    }).then(function (data) {
	      dispatch({
	        type: actionTypes.GET_PAY_METHODS,
	        management: {
	          paymentMethods: data
	        }
	      });
	    }).fail(function () {
	      console.log('Retrieving cards failed');
	      dispatch(error('Retrieving cards failed'));
	    });
	  };
	}
	
	function closeModal() {
	  console.log('closeModal');
	  return {
	    type: actionTypes.CLOSE_MODAL
	  };
	}

/***/ },

/***/ 197:
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
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsModal = __webpack_require__(198);
	
	var _componentsModal2 = _interopRequireDefault(_componentsModal);
	
	var _componentsError = __webpack_require__(201);
	
	var _componentsError2 = _interopRequireDefault(_componentsError);
	
	var ModalError = (function (_Component) {
	  _inherits(ModalError, _Component);
	
	  function ModalError() {
	    _classCallCheck(this, ModalError);
	
	    _get(Object.getPrototypeOf(ModalError.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(ModalError, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        _componentsModal2['default'],
	        { handleClose: this.props.closeModal },
	        _react2['default'].createElement(_componentsError2['default'], { error: this.props.error })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      closeModal: _react.PropTypes.func.isRequired,
	      error: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return ModalError;
	})(_react.Component);
	
	exports['default'] = ModalError;
	module.exports = exports['default'];

/***/ },

/***/ 198:
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
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(199);
	
	var _classnames = __webpack_require__(200);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Modal = (function (_Component) {
	  _inherits(Modal, _Component);
	
	  function Modal() {
	    var _this = this;
	
	    _classCallCheck(this, Modal);
	
	    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).apply(this, arguments);
	
	    this.onClose = function (e) {
	      var targetClassName = e.target.getAttribute('class') || '';
	      var classes = targetClassName.split(' ');
	      // Only deal with closing the window if the event
	      // came from the backdrop or the close link.
	      if (classes.length > 0 && (classes.indexOf('modal') > -1 || classes.indexOf('close') > -1)) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this.props.handleClose();
	      }
	    };
	  }
	
	  _createClass(Modal, [{
	    key: 'render',
	    value: function render() {
	      var classes = (0, _classnames2['default'])(['modal', { 'active': true }]);
	
	      return _react2['default'].createElement(
	        'div',
	        { className: classes, onClick: this.onClose },
	        _react2['default'].createElement(
	          'div',
	          { className: "inner" },
	          _react2['default'].createElement(
	            'header',
	            null,
	            this.props.title ? _react2['default'].createElement(
	              'h2',
	              null,
	              this.props.title
	            ) : null,
	            _react2['default'].createElement(
	              'a',
	              { href: "#", onClick: this.onClose, className: "close" },
	              _react2['default'].createElement(
	                'span',
	                { className: "vh" },
	                (0, _utils.gettext)('Close')
	              )
	            )
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: "content" },
	            this.props.children
	          )
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.object.isRequired,
	      handleClose: _react.PropTypes.func.isRequired,
	      title: _react.PropTypes.string
	    },
	    enumerable: true
	  }]);
	
	  return Modal;
	})(_react.Component);
	
	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },

/***/ 202:
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
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsAccordion = __webpack_require__(203);
	
	var _utils = __webpack_require__(199);
	
	var Management = (function (_Component) {
	  _inherits(Management, _Component);
	
	  function Management() {
	    _classCallCheck(this, Management);
	
	    _get(Object.getPrototypeOf(Management.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Management, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'header',
	          { className: "top-nav" },
	          _react2['default'].createElement(
	            'h1',
	            { className: "logo" },
	            'Firefox Payments'
	          ),
	          _react2['default'].createElement(
	            'button',
	            null,
	            (0, _utils.gettext)('Sign Out')
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: "content" },
	          _react2['default'].createElement(
	            'div',
	            { className: "user" },
	            _react2['default'].createElement(
	              'p',
	              null,
	              'Hello, placeholder@placeholder.com'
	            )
	          ),
	          _react2['default'].createElement(
	            _componentsAccordion.Accordion,
	            null,
	            _react2['default'].createElement(
	              _componentsAccordion.AccordionSection,
	              null,
	              _react2['default'].createElement(
	                'header',
	                null,
	                _react2['default'].createElement(
	                  'h2',
	                  null,
	                  (0, _utils.gettext)('Payment Accounts')
	                ),
	                _react2['default'].createElement(
	                  'button',
	                  {
	                    onClick: this.props.getPayMethods },
	                  (0, _utils.gettext)('Change')
	                )
	              )
	            ),
	            _react2['default'].createElement(
	              _componentsAccordion.AccordionSection,
	              null,
	              _react2['default'].createElement(
	                'header',
	                null,
	                _react2['default'].createElement(
	                  'h2',
	                  null,
	                  (0, _utils.gettext)('Receipts and Subscriptions')
	                ),
	                _react2['default'].createElement(
	                  'button',
	                  { 'data-activate': true },
	                  (0, _utils.gettext)('View/Change')
	                )
	              ),
	              _react2['default'].createElement(
	                _componentsAccordion.AccordionContent,
	                null,
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'Placeholder'
	                )
	              )
	            ),
	            _react2['default'].createElement(
	              _componentsAccordion.AccordionSection,
	              null,
	              _react2['default'].createElement(
	                'header',
	                null,
	                _react2['default'].createElement(
	                  'h2',
	                  null,
	                  (0, _utils.gettext)('Email Address and Password')
	                ),
	                _react2['default'].createElement(
	                  'a',
	                  { className: "button",
	                    href: "https://mozilla.org/",
	                    target: "_blank" },
	                  (0, _utils.gettext)('Change')
	                ),
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'placeholder@placeholder.com'
	                )
	              )
	            ),
	            _react2['default'].createElement(
	              _componentsAccordion.AccordionSection,
	              null,
	              _react2['default'].createElement(
	                'header',
	                null,
	                _react2['default'].createElement(
	                  'h2',
	                  null,
	                  (0, _utils.gettext)('Delete Account')
	                ),
	                _react2['default'].createElement(
	                  'button',
	                  { 'data-activate': true },
	                  (0, _utils.gettext)('Delete')
	                )
	              ),
	              _react2['default'].createElement(
	                _componentsAccordion.AccordionContent,
	                null,
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'Placeholder content'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      getPayMethods: _react.PropTypes.func.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return Management;
	})(_react.Component);
	
	exports['default'] = Management;
	module.exports = exports['default'];

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/*eslint react/no-multi-comp: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(200);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Accordion = (function (_Component) {
	  _inherits(Accordion, _Component);
	
	  _createClass(Accordion, null, [{
	    key: 'propTypes',
	    value: {
	      children: _react.PropTypes.node.isRequired
	    },
	    enumerable: true
	  }]);
	
	  function Accordion(props) {
	    _classCallCheck(this, Accordion);
	
	    _get(Object.getPrototypeOf(Accordion.prototype), 'constructor', this).call(this, props);
	    var sections = [];
	    _react2['default'].Children.forEach(this.props.children, function () {
	      sections.push({ isActive: false });
	    });
	    sections[0].isActive = true;
	    this.state = {
	      sections: sections
	    };
	  }
	
	  _createClass(Accordion, [{
	    key: 'activate',
	    value: function activate(sectionIdx, e) {
	      if (e.target.getAttribute('data-activate') !== null) {
	        e.preventDefault();
	        var sections = this.state.sections;
	        sections.forEach(function (section, idx) {
	          section.isActive = sectionIdx === idx;
	        });
	        this.setState({ sections: sections });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var children = _react2['default'].Children.map(this.props.children, function (child, idx) {
	        return _react2['default'].cloneElement(child, {
	          activate: _this.activate.bind(_this, idx),
	          isActive: _this.state.sections[idx].isActive
	        });
	      });
	      return _react2['default'].createElement(
	        'div',
	        { className: "accordion", ref: "accordion" },
	        children
	      );
	    }
	  }]);
	
	  return Accordion;
	})(_react.Component);
	
	exports.Accordion = Accordion;
	
	var AccordionSection = (function (_Component2) {
	  _inherits(AccordionSection, _Component2);
	
	  function AccordionSection() {
	    _classCallCheck(this, AccordionSection);
	
	    _get(Object.getPrototypeOf(AccordionSection.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(AccordionSection, [{
	    key: 'render',
	    value: function render() {
	      var classes = (0, _classnames2['default'])('ac-section', { 'active': this.props.isActive });
	
	      return _react2['default'].createElement(
	        'section',
	        { onClick: this.props.activate,
	          className: classes },
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      activate: _react2['default'].PropTypes.func.isRequired,
	      children: _react2['default'].PropTypes.node.isRequired,
	      isActive: _react2['default'].PropTypes.bool
	    },
	    enumerable: true
	  }]);
	
	  return AccordionSection;
	})(_react.Component);
	
	exports.AccordionSection = AccordionSection;
	
	var AccordionContent = (function (_Component3) {
	  _inherits(AccordionContent, _Component3);
	
	  function AccordionContent() {
	    _classCallCheck(this, AccordionContent);
	
	    _get(Object.getPrototypeOf(AccordionContent.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(AccordionContent, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: "ac-content" },
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: _react2['default'].PropTypes.node.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return AccordionContent;
	})(_react.Component);
	
	exports.AccordionContent = AccordionContent;

/***/ },

/***/ 204:
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
	
	var _react = __webpack_require__(10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsModal = __webpack_require__(198);
	
	var _componentsModal2 = _interopRequireDefault(_componentsModal);
	
	var _componentsCardList = __webpack_require__(205);
	
	var _componentsCardList2 = _interopRequireDefault(_componentsCardList);
	
	var _utils = __webpack_require__(199);
	
	var ManageCards = (function (_Component) {
	  _inherits(ManageCards, _Component);
	
	  function ManageCards() {
	    _classCallCheck(this, ManageCards);
	
	    _get(Object.getPrototypeOf(ManageCards.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(ManageCards, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        _componentsModal2['default'],
	        {
	          handleClose: this.props.closeModal,
	          title: (0, _utils.gettext)('Payment Methods') },
	        _react2['default'].createElement(_componentsCardList2['default'], { cards: this.props.paymentMethods })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      closeModal: _react.PropTypes.func.isRequired,
	      paymentMethods: _react.PropTypes.array.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return ManageCards;
	})(_react.Component);
	
	exports['default'] = ManageCards;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=management.bundle.js.map