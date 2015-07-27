import * as actionTypes from 'constants/action-types';

const defaults = {
  signedIn: false,
  email: null,
  payment_methods: [],
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

  return state || defaults;
}
