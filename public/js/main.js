'use strict';

var $ = require('jquery');
var App = require('app');
var tracking = require('tracking');

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

tracking.init();
App.init();
