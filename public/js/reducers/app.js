import * as actionTypes from 'constants/action-types';


export const initialAppState = {
  csrfToken: null,
  error: null,
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: {
          debugMessage: action.error.debugMessage,
        },
      });
    case actionTypes.GOT_CSRF_TOKEN:
      return Object.assign({}, state, {
        csrfToken: action.csrfToken,
      });
    default:
      return state || initialAppState;
  }
}
