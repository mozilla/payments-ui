'use strict';

var assign = require('object-assign');

var dispatcher = require('dispatcher');

module.exports = assign({}, {

  setError: function(debugMessage) {
    dispatcher.dispatch({
      actionType: 'set-app-error',
      error: {debugMessage: debugMessage},
    });
  },

});
