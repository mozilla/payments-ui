import * as actionTypes from 'constants/action-types';

export const initialUserState = {
  signedIn: false,
  email: null,
  payment_methods: [],
  braintreeToken: null,
  subscriptions: null,
};


export default function user(state, action) {

  if (action.type === actionTypes.USER_SIGNED_OUT) {
    console.log('user store: got action', action);
    return Object.assign({}, initialUserState, {
      signedIn: false,
    });
  }

  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('user store: got action', action);
    return Object.assign({}, initialUserState, {
      signedIn: true,
      email: action.user.email,
      payment_methods: action.user.payment_methods,
    });
  }

  if (action.type === actionTypes.GOT_BRAINTREE_TOKEN) {
    console.log('user store: got action', action);
    // Inherits existing state.
    return Object.assign({}, initialUserState, state, {
      braintreeToken: action.user.braintreeToken,
    });
  }

  if (action.type === actionTypes.LOADING_USER_SUBSCRIPTIONS) {
    console.log('user: initializing from', action);
    return Object.assign({}, initialUserState, state, {
      subscriptions: initialUserState.subscriptions,
    });
  }

  if (action.type === actionTypes.GOT_USER_SUBSCRIPTIONS) {
    console.log('user: storing subscriptions from', action);
    return Object.assign({}, initialUserState, state, {
      subscriptions: action.subscriptions,
    });
  }

  return state || initialUserState;
}
