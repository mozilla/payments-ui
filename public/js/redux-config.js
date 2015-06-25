'use strict';

var redux = require('redux');
var dataStore = require('data-store');

function createRedux() {
  return redux.createRedux(dataStore);
}

exports.create = createRedux;
exports.default = createRedux();
