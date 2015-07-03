'use strict';

var actionTypes = require('actions/types');


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
      signedIn: true,
      email: action.user.email,
      payment_methods: action.user.payment_methods,
    };
  }
  return state || {
    signedIn: false,
  };
};


exports.purchase = function(state, action) {

  if (action.type === actionTypes.COMPLETE_PURCHASE) {
    console.log('purchase store: got action', action);
    return {
      completed: true,
    };
  }

  if (action.type === actionTypes.PAY_WITH_NEW_CARD) {
    console.log('purchase store: got action', action);
    return {
      completed: false,
      payment_methods: [],
    };
  }

  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('purchase store: got action', action);
    return {
      completed: false,
      payment_methods: action.user.payment_methods,
    };
  }

  return state || {
    completed: false,
    payment_methods: [],
  };
};
