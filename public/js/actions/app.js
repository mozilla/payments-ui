'use strict';

var actionTypes = require('constants/action-types');

module.exports = {
  error: function(debugMessage) {
    return {
      type: actionTypes.APP_ERROR,
      error: {debugMessage: debugMessage},
    };
  },
};
