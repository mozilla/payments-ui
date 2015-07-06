'use strict';

var assign = require('object-assign');

var actionTypes = require('./types');

module.exports = assign({}, {

  error: function(debugMessage) {
    return {
      type: actionTypes.APP_ERROR,
      error: {debugMessage: debugMessage},
    };
  },

});
