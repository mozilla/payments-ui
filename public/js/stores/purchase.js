import * as actionTypes from 'constants/action-types';


export default function purchase(state, action) {

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
}
