import * as actionTypes from 'constants/action-types';


export const initialMgmtState = {
  error: null,
  tab: null,
  view: null,
};


export default function management(state, action) {
  state = state || initialMgmtState;
  var newState;

  switch (action.type) {
    case actionTypes.USER_SIGNED_IN:
      if (!state.tab) {
        newState = Object.assign({}, initialMgmtState, {
          tab: 'profile',
          view: actionTypes.SHOW_MY_ACCOUNT,
        });
      }
      break;
    case actionTypes.APP_ERROR:
      newState = Object.assign({}, initialMgmtState, {
        error: {
          debugMessage: action.error.debugMessage,
        },
      });
      break;
    case actionTypes.SHOW_MY_ACCOUNT:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'profile',
        view: action.type,
      });
      break;
    case actionTypes.SHOW_PAY_METHODS:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
      break;
    case actionTypes.SHOW_ADD_PAY_METHOD:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
      break;
    case actionTypes.SHOW_DEL_PAY_METHOD:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
      break;
    case actionTypes.SHOW_HISTORY:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'history',
        view: action.type,
      });
      break;
    case actionTypes.SHOW_SUBSCRIPTIONS:
      newState = Object.assign({}, initialMgmtState, {
        tab: 'subs',
        view: action.type,
      });
      break;
    case actionTypes.CREDIT_CARD_SUBMISSION_ERRORS:
      newState = Object.assign({}, initialMgmtState, {
        cardSubmissionErrors: action.apiErrorResult,
      });
      break;
    case actionTypes.CLOSE_MODAL:
      newState = initialMgmtState;
      break;
  }

  if (newState) {
    console.log('management: new state for action', action);
  }

  return newState || state;
}
