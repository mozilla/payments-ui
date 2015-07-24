import * as actionTypes from 'constants/action-types';

export default function user(state, action) {
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
}
