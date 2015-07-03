webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	var Spinner = __webpack_require__(3);
	React.render(React.createElement(Spinner, null), document.getElementById('view'));


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4);
	
	module.exports = React.createClass({
	  displayName: 'Spinner',
	  propTypes: {
	    text: React.PropTypes.string.isRequired,
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "spinner-cont"}, 
	        React.createElement("div", {className: "spinner"}), 
	        React.createElement("span", {className: "text"}, this.props.text)
	      )
	    );
	  },
	});


/***/ }
]);
//# sourceMappingURL=spinner.bundle.js.map