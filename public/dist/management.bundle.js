webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(1);
	var App = __webpack_require__(2);
	
	// Common ajax settings.
	$.ajaxSetup({
	  dataType: 'json'
	});
	
	App.init();

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	__webpack_require__(20);
	
	var React = __webpack_require__(27);
	var Provider = __webpack_require__(183).Provider;
	var Connector = __webpack_require__(183).Connector;
	var bindActionCreators = __webpack_require__(4).bindActionCreators;
	
	var reduxConfig = __webpack_require__(3);
	var managementActions = __webpack_require__(196);
	
	var ModalError = __webpack_require__(197);
	var Management = __webpack_require__(202);
	var ManageCards = __webpack_require__(204);
	
	var App = React.createClass({
	
	  displayName: 'ManagementApp',
	
	  selectData: function selectData(state) {
	    return {
	      management: state.management
	    };
	  },
	
	  renderChild: function renderChild(connector) {
	    var actions = bindActionCreators(managementActions, connector.dispatch);
	    var children = [];
	
	    if (connector.management.error) {
	      children.push(React.createElement(ModalError, _extends({}, actions, { error: connector.management.error })));
	    } else if (connector.management.paymentMethods) {
	      children.push(React.createElement(ManageCards, _extends({}, actions, {
	        paymentMethods: connector.management.paymentMethods })));
	    }
	    children.push(React.createElement(Management, actions));
	    return React.createElement(
	      'div',
	      null,
	      children
	    );
	  },
	
	  render: function render() {
	    return React.createElement(
	      'main',
	      null,
	      React.createElement(
	        Connector,
	        { select: this.selectData },
	        this.renderChild
	      )
	    );
	  }
	});
	
	module.exports = {
	  component: App,
	  init: function init() {
	    React.render(React.createElement(
	      Provider,
	      { redux: reduxConfig['default'] },
	      function () {
	        return React.createElement(App, null);
	      }
	    ), document.body);
	  }
	};

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
	
	var _constantsActionTypes = __webpack_require__(16);
	
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
	
	var React = __webpack_require__(27);
	var Modal = __webpack_require__(198);
	
	var ErrorMessage = __webpack_require__(201);
	
	module.exports = React.createClass({
	
	  displayName: 'ModalError',
	
	  propTypes: {
	    closeModal: React.PropTypes.func.isRequired,
	    error: React.PropTypes.object.isRequired
	  },
	
	  render: function render() {
	    return React.createElement(
	      Modal,
	      { handleClose: this.props.closeModal },
	      React.createElement(ErrorMessage, { error: this.props.error })
	    );
	  }
	
	});

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(27);
	var gettext = __webpack_require__(199).gettext;
	var cx = __webpack_require__(200);
	
	module.exports = React.createClass({
	
	  displayName: 'Modal',
	
	  propTypes: {
	    children: React.PropTypes.object.isRequired,
	    handleClose: React.PropTypes.func.isRequired,
	    title: React.PropTypes.string
	  },
	
	  onClose: function onClose(e) {
	    var targetClassName = e.target.getAttribute('class') || '';
	    var classes = targetClassName.split(' ');
	    // Only deal with closing the window if the event
	    // came from the backdrop or the close link.
	    if (classes.length > 0 && (classes.indexOf('modal') > -1 || classes.indexOf('close') > -1)) {
	      e.preventDefault();
	      e.stopPropagation();
	      this.props.handleClose();
	    }
	  },
	
	  render: function render() {
	    var classes = cx(['modal', { 'active': true }]);
	
	    return React.createElement(
	      'div',
	      { className: classes, onClick: this.onClose },
	      React.createElement(
	        'div',
	        { className: 'inner' },
	        React.createElement(
	          'header',
	          null,
	          this.props.title ? React.createElement(
	            'h2',
	            null,
	            this.props.title
	          ) : null,
	          React.createElement(
	            'a',
	            { href: '#', onClick: this.onClose, className: 'close' },
	            React.createElement(
	              'span',
	              { className: 'vh' },
	              gettext('Close')
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'content' },
	          this.props.children
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(27);
	
	var _require = __webpack_require__(203);
	
	var Accordion = _require.Accordion;
	var AccordionContent = _require.AccordionContent;
	var AccordionSection = _require.AccordionSection;
	
	var gettext = __webpack_require__(199).gettext;
	
	module.exports = React.createClass({
	
	  displayName: 'ManagementApp',
	
	  propTypes: {
	    getPayMethods: React.PropTypes.func.isRequired
	  },
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'header',
	        { className: 'top-nav' },
	        React.createElement(
	          'h1',
	          { className: 'logo' },
	          'Firefox Payments'
	        ),
	        React.createElement(
	          'button',
	          null,
	          gettext('Sign Out')
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'div',
	          { className: 'user' },
	          React.createElement(
	            'p',
	            null,
	            'Hello, placeholder@placeholder.com'
	          )
	        ),
	        React.createElement(
	          Accordion,
	          null,
	          React.createElement(
	            AccordionSection,
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h2',
	                null,
	                gettext('Payment Accounts')
	              ),
	              React.createElement(
	                'button',
	                {
	                  onClick: this.props.getPayMethods },
	                gettext('Change')
	              )
	            )
	          ),
	          React.createElement(
	            AccordionSection,
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h2',
	                null,
	                gettext('Receipts and Subscriptions')
	              ),
	              React.createElement(
	                'button',
	                { 'data-activate': true },
	                gettext('View/Change')
	              )
	            ),
	            React.createElement(
	              AccordionContent,
	              null,
	              React.createElement(
	                'p',
	                null,
	                'Placeholder'
	              )
	            )
	          ),
	          React.createElement(
	            AccordionSection,
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h2',
	                null,
	                gettext('Email Address and Password')
	              ),
	              React.createElement(
	                'a',
	                { className: 'button',
	                  href: 'https://mozilla.org/',
	                  target: '_blank' },
	                gettext('Change')
	              ),
	              React.createElement(
	                'p',
	                null,
	                'placeholder@placeholder.com'
	              )
	            )
	          ),
	          React.createElement(
	            AccordionSection,
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h2',
	                null,
	                gettext('Delete Account')
	              ),
	              React.createElement(
	                'button',
	                { 'data-activate': true },
	                gettext('Delete')
	              )
	            ),
	            React.createElement(
	              AccordionContent,
	              null,
	              React.createElement(
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
	});

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint react/no-multi-comp: 0 */
	
	var React = __webpack_require__(27);
	var cx = __webpack_require__(200);
	
	var Accordion = React.createClass({
	
	  displayName: 'Accordion',
	
	  propTypes: {
	    children: React.PropTypes.node.isRequired
	  },
	
	  getInitialState: function getInitialState() {
	    var sections = [];
	    React.Children.forEach(this.props.children, function () {
	      sections.push({ isActive: false });
	    });
	    sections[0].isActive = true;
	    return {
	      sections: sections
	    };
	  },
	
	  activate: function activate(sectionIdx, e) {
	    if (e.target.getAttribute('data-activate') !== null) {
	      e.preventDefault();
	      var sections = this.state.sections;
	      sections.forEach(function (section, idx) {
	        section.isActive = sectionIdx === idx;
	      });
	      this.setState({ sections: sections });
	    }
	  },
	
	  render: function render() {
	    var that = this;
	    var children = React.Children.map(this.props.children, function (child, idx) {
	      return React.cloneElement(child, {
	        activate: that.activate.bind(that, idx),
	        isActive: that.state.sections[idx].isActive
	      });
	    });
	    return React.createElement(
	      'div',
	      { className: 'accordion', ref: 'accordion' },
	      children
	    );
	  }
	});
	
	var AccordionSection = React.createClass({
	
	  displayName: 'AccordionSection',
	
	  propTypes: {
	    activate: React.PropTypes.func.isRequired,
	    children: React.PropTypes.node.isRequired,
	    isActive: React.PropTypes.bool
	  },
	
	  render: function render() {
	
	    var classes = cx('ac-section', { 'active': this.props.isActive });
	
	    return React.createElement(
	      'section',
	      { onClick: this.props.activate,
	        className: classes },
	      this.props.children
	    );
	  }
	});
	
	var AccordionContent = React.createClass({
	
	  displayName: 'AccordionContent',
	
	  propTypes: {
	    children: React.PropTypes.node.isRequired
	  },
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'ac-content' },
	      this.props.children
	    );
	  }
	});
	
	module.exports = {
	  Accordion: Accordion,
	  AccordionContent: AccordionContent,
	  AccordionSection: AccordionSection
	};

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(27);
	
	var Modal = __webpack_require__(198);
	var CardList = __webpack_require__(205);
	
	var gettext = __webpack_require__(199).gettext;
	
	module.exports = React.createClass({
	
	  displayName: 'ManageCards',
	
	  propTypes: {
	    closeModal: React.PropTypes.func.isRequired,
	    paymentMethods: React.PropTypes.array.isRequired
	  },
	
	  render: function render() {
	    return React.createElement(
	      Modal,
	      {
	        handleClose: this.props.closeModal,
	        title: gettext('Payment Methods') },
	      React.createElement(CardList, { cards: this.props.paymentMethods })
	    );
	  }
	
	});

/***/ }

});
//# sourceMappingURL=management.bundle.js.map