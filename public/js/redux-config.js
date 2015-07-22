'use strict';

var redux = require('redux');
var dataStore = require('stores/index');
console.log(dataStore);

function createRedux() {
  return redux.createRedux(dataStore);
}

exports.create = createRedux;
exports.default = createRedux();
