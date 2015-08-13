import * as actionTypes from 'constants/action-types';


export const initialMgmtState = {
  error: null,
  tab: null,
  view: null,
};


export default function management(state, action) {
  state = state || initialMgmtState;

  switch (action.type) {
    case actionTypes.USER_SIGNED_IN:
      if (!state.tab) {
        return Object.assign({}, initialMgmtState, {
          tab: 'profile',
          view: actionTypes.SHOW_MY_ACCOUNT,
        });
      }
      return state;
    case actionTypes.APP_ERROR:
      return Object.assign({}, initialMgmtState, {
        error: {
          debugMessage: action.error.debugMessage,
        },
      });
    case actionTypes.SHOW_MY_ACCOUNT:
      return Object.assign({}, initialMgmtState, {
        tab: 'profile',
        view: action.type,
      });
    case actionTypes.SHOW_PAY_METHODS:
      return Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
    case actionTypes.SHOW_SIGN_IN:
      // Reset all view/tab state which will trigger a sign-in screen.
      return Object.assign({}, initialMgmtState);
    case actionTypes.SHOW_ADD_PAY_METHOD:
      return Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
    case actionTypes.SHOW_DEL_PAY_METHOD:
      return Object.assign({}, initialMgmtState, {
        tab: 'pay-methods',
        view: action.type,
      });
    case actionTypes.SHOW_HISTORY:
      return Object.assign({}, initialMgmtState, {
        tab: 'history',
        view: action.type,
      });
    case actionTypes.SHOW_SIGN_OUT:
      return Object.assign({}, initialMgmtState, {
        tab: 'profile',
        view: action.type,
      });
    case actionTypes.SHOW_SUBSCRIPTIONS:
      return Object.assign({}, initialMgmtState, {
        tab: 'subs',
        view: action.type,
      });
    case actionTypes.CREDIT_CARD_SUBMISSION_ERRORS:
      return Object.assign({}, initialMgmtState, {
        cardSubmissionErrors: action.apiErrorResult,
      });
    case actionTypes.CLOSE_MODAL:
      return initialMgmtState;
    default:
      return state;
  }
}
