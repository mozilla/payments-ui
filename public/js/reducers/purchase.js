import * as actionTypes from 'constants/action-types';


export const initialState = {
  completed: false,
  payment_methods: [],
  cardSubmissionErrors: null,
};


export default function purchase(state, action) {

  if (action.type === actionTypes.COMPLETE_PURCHASE) {
    console.log('purchase: completing purchase from', action);
    return Object.assign({}, initialState, {
      completed: true,
    });
  }

  if (action.type === actionTypes.PAY_WITH_NEW_CARD) {
    console.log('purchase: resetting payment methods from', action);
    return Object.assign({}, initialState, {
      payment_methods: [],
    });
  }

  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('purchase: resetting user state from', action);
    return Object.assign({}, initialState, {
      payment_methods: action.user.payment_methods,
    });
  }

  if (action.type === actionTypes.CREDIT_CARD_SUBMISSION_ERRORS) {
    console.log('purchase: setting submission errors from', action);
    return Object.assign({}, initialState, {
      cardSubmissionErrors: action.apiErrorResult,
    });
  }

  return state || initialState;
}
