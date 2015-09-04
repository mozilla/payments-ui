import * as actionTypes from 'constants/action-types';


export function error(debugMessage, {userMessage} = {}) {
  return {
    type: actionTypes.APP_ERROR,
    error: {
      debugMessage: debugMessage,
      userMessage: userMessage,
    },
  };
}
