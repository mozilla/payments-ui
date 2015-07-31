import * as actionTypes from 'constants/action-types';


export const initialMgmtState = {
  error: null,
  tab: null,
};

export default function management(state, action) {

  if (action.type === actionTypes.APP_ERROR) {
    console.log('management store: got action', action);
    return Object.assign({}, initialMgmtState, {
      error: {
        debugMessage: action.error.debugMessage,
      },
    });
  }

  if (action.type === actionTypes.SHOW_PAY_METHODS) {
    console.log('management store: got action', action);
    return Object.assign({}, initialMgmtState, {
      tab: action.type,
    });
  }

  if (action.type === actionTypes.SHOW_ADD_PAY_METHOD) {
    console.log('management store: got action', action);
    return Object.assign({}, initialMgmtState, {
      tab: action.type,
    });
  }

  if (action.type === actionTypes.SHOW_DEL_PAY_METHOD) {
    console.log('management store: got action', action);
    return Object.assign({}, initialMgmtState, {
      tab: action.type,
    });
  }

  if (action.type === actionTypes.CREDIT_CARD_SUBMISSION_ERRORS) {
    console.log('managment: setting submission errors from', action);
    return Object.assign({}, initialMgmtState, {
      cardSubmissionErrors: action.apiErrorResult,
    });
  }

  if (action.type === actionTypes.CLOSE_MODAL) {
    console.log('management store: got action', action);
    return initialMgmtState;
  }

  return state || initialMgmtState;
}
