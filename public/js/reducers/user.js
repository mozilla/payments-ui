import * as actionTypes from 'constants/action-types';


export const initialUserState = {
  signedIn: false,
  email: null,
  payMethods: [],
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
    return Object.assign({}, initialUserState, {
      signedIn: true,
      email: action.user.email,
      payMethods: action.user.payMethods,
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

  if (action.type === actionTypes.GOT_PAY_METHODS) {
    console.log('user store: got action', action);
    return Object.assign({}, initialUserState, state, {
      payMethods: action.payMethods,
    });
  }

  if (action.type === actionTypes.ADD_PAY_METHOD) {
    console.log('user store: got action', action);
    return Object.assign({}, initialUserState, state, {
      payMethods: action.payMethods,
    });
  }

  if (action.type === actionTypes.DEL_PAY_METHOD) {
    console.log('user store: got action', action);
    return Object.assign({}, initialUserState, state, {
      payMethods: action.payMethods,
    });
  }

  return state || initialUserState;
}
