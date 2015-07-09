'use strict';

var $ = require('jquery');
var tracking = require('tracking');
var App = require('./app');

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

tracking.init();
App.init();
