import * as actionTypes from 'constants/action-types';


export const initialTransState = {
  completed: false,
  availablePayMethods: [],
  cardSubmissionErrors: null,
};


export default function transaction(state, action) {

  if (action.type === actionTypes.COMPLETE_TRANSACTION) {
    console.log('transaction: completing transaction from', action);
    return Object.assign({}, initialTransState, {
      completed: true,
    });
  }

  if (action.type === actionTypes.PAY_WITH_NEW_CARD) {
    console.log('transaction: resetting payment methods from', action);
    // What this does is tell Purchase that there are no available
    // payment methods for the transaction even though the user
    // itself may have some. This causes a 'pay with new card' form
    // to appear.
    return Object.assign({}, initialTransState, {
      availablePayMethods: [],
    });
  }

  if (action.type === actionTypes.USER_SIGNED_IN) {
    console.log('transaction: setting default available pay methods from',
                action);
    // By default, assume the user wants to pay with their saved pay methods.
    return Object.assign({}, initialTransState, {
      availablePayMethods: action.user.payMethods,
    });
  }

  if (action.type === actionTypes.CREDIT_CARD_SUBMISSION_ERRORS) {
    console.log('transaction: setting submission errors from', action);
    return Object.assign({}, initialTransState, {
      cardSubmissionErrors: action.apiErrorResult,
    });
  }

  return state || initialTransState;
}
