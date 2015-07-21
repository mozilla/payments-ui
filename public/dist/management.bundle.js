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
	
	var React = __webpack_require__(3);
	
	var _require = __webpack_require__(159);
	
	var Accordion = _require.Accordion;
	var AccordionContent = _require.AccordionContent;
	var AccordionSection = _require.AccordionSection;
	
	var Modal = __webpack_require__(161);
	
	var gettext = __webpack_require__(162).gettext;
	
	var Management = React.createClass({
	
	  displayName: 'ManagementApp',
	
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
	                { 'data-activate': true },
	                gettext('Change')
	              )
	            ),
	            React.createElement(
	              AccordionContent,
	              null,
	              React.createElement(
	                'p',
	                null,
	                'Payment list will go here'
	              ),
	              React.createElement(
	                'ul',
	                null,
	                React.createElement(
	                  'li',
	                  null,
	                  '4111 1111 1111 1111'
	                ),
	                React.createElement(
	                  'li',
	                  null,
	                  '4222 2222 2222 2222'
	                )
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
	
	module.exports = {
	  component: Management,
	  init: function init() {
	    React.render(React.createElement(Modal, null), document.getElementById('modal'));
	    React.render(React.createElement(Management, null), document.getElementById('view'));
	  }
	};

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint react/no-multi-comp: 0 */
	
	var React = __webpack_require__(3);
	var cx = __webpack_require__(160);
	
	var Accordion = React.createClass({
	
	  displayName: 'Accordion',
	
	  propTypes: {
	    children: React.PropTypes.array
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
	    activate: React.PropTypes['function'],
	    children: React.PropTypes.array,
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
	    children: React.PropTypes.array
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

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(3);
	var gettext = __webpack_require__(162).gettext;
	var cx = __webpack_require__(160);
	
	module.exports = React.createClass({
	
	  displayName: 'Modal',
	
	  propTypes: {
	    children: React.PropTypes.array.required,
	    close: React.PropTypes.func,
	    showModal: React.PropTypes.bool,
	    title: React.PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      showModal: true
	    };
	  },
	
	  render: function render() {
	
	    var classes = cx(['modal', { 'active': this.props.showModal }]);
	
	    return React.createElement(
	      'div',
	      { className: classes, onClick: this.props.close },
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
	            { href: '#', onClick: this.props.close, className: 'close' },
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

/***/ }

});
//# sourceMappingURL=management.bundle.js.map