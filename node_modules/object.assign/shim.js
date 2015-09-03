'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimAssign() {
	var polyfill = getPolyfill();
	if (Object.assign !== polyfill) {
		define(Object, { assign: polyfill });
	}
	return polyfill;
};
