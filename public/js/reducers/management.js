import * as actionTypes from 'constants/action-types';


export const initialMgmtState = {
  tab: null,
  view: null,
  viewData: {},
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
    case actionTypes.GOT_SUBS_BY_PAY_METHOD:
      return Object.assign({}, initialMgmtState, state, {
        // This is short-lived data only relevant to the current
        // operation.
        viewData: {
          affectedSubscriptions: action.subscriptions,
          payMethodUri: action.payMethodUri,
        },
      });
    case actionTypes.SHOW_CONFIRM_DEL_PAY_METHOD:
      return Object.assign({}, initialMgmtState, state, {
        // Ephemeral data for this operation only.
        tab: 'pay-methods',
        view: action.type,
        viewData: {
          payMethodUri: action.payMethodUri,
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
    case actionTypes.SHOW_SUBS:
      return Object.assign({}, initialMgmtState, {
        tab: 'subs',
        view: action.type,
      });
    case actionTypes.CREDIT_CARD_SUBMISSION_ERRORS:
      return Object.assign({}, state, {
        cardSubmissionErrors: action.apiErrorResult,
      });
    case actionTypes.CLOSE_MODAL:
      return initialMgmtState;

    default:
      return state;
  }
}
