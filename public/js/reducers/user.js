import * as actionTypes from 'constants/action-types';

export const defaults = {
  signedIn: false,
  email: null,
  payment_methods: [],
  braintreeToken: null,
};

export default function user(state, action) {

  if (action.type === actionTypes.USER_SIGNED_OUT) {
    console.log('user store: got action', action);
    return Object.assign({}, defaults, {
      signedIn: false,
    });
  }

  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('user store: got action', action);
    return Object.assign({}, defaults, {
      signedIn: true,
      email: action.user.email,
      payment_methods: action.user.payment_methods,
    });
  }

  if (action.type === actionTypes.GOT_BRAINTREE_TOKEN) {
    console.log('user store: got action', action);
    // Inherits existing state.
    return Object.assign({}, defaults, state, {
      braintreeToken: action.user.braintreeToken,
    });
  }

  return state || defaults;
}
