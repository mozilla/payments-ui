'use strict';

var actionTypes = require('constants/action-types');

export default function management(state, action) {
  console.log('management store: got action', action);

  var defaults = {
    error: null,
    paymentMethods: null,
  };

  if (action.type === actionTypes.APP_ERROR) {
    return Object.assign({}, defaults, {
      error: {
        debugMessage: action.error.debugMessage,
      },
    });
  }

  if (action.type === actionTypes.GET_PAY_METHODS) {
    return Object.assign({}, defaults, {
      paymentMethods: action.management.paymentMethods,
    });
  }

  if (action.type === actionTypes.CLOSE_MODAL) {
    return defaults;
  }

  return state || defaults;
}
