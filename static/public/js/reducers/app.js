import * as actionTypes from 'constants/action-types';


export default function app(state, action) {

  if (action.type === actionTypes.APP_ERROR) {
    return {
      error: {
        debugMessage: action.error.debugMessage,
      },
    };
  }

  return state || {};
}
