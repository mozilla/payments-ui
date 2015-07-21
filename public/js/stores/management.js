'use strict';

var actionTypes = require('constants/action-types');

export default function management(state, action) {
  console.log('management store: got action', action);

  if (action.type === actionTypes.MANAGE_CARD_LIST) {
    return {
      showModal: true,
      payment_methods: action.user.payment_methods,
    };
  }

  if (action.type === actionTypes.MANAGE_CLOSE_MODAL) {
    return {
      showModal: false,
    };
  }

  return state || {
    showModal: false,
    payment_methods: [],
  };
}
