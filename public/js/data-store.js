'use strict';

var actionTypes = require('action-types');


exports.app = function(state, action) {
  if (action.type === actionTypes.APP_ERROR) {
    console.log('app store: got action', action);
    return {
      error: {
        debugMessage: action.error.debugMessage,
      },
    };
  }

  // TODO: we probably need to receive a clear-error action.

  return state || {};
};


exports.user = function(state, action) {
  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('user store: got action', action);
    return {
      email: action.user.email,
      payment_methods: action.user.payment_methods,
    };
  }
  return state || {};
};
