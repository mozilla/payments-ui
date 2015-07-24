import * as actionTypes from 'constants/action-types';

export default function app(state, action) {
  if (action.type === actionTypes.APP_ERROR) {
    console.log('app store: got action', action);
    return {
      error: {
        debugMessage: action.error.debugMessage,
      },
    };
  }
  return state || {};
}
