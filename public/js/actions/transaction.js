import * as actionTypes from 'constants/action-types';


export function complete() {
  return {
    type: actionTypes.COMPLETE_TRANSACTION,
  };
}


export function payWithNewCard() {
  return {
    type: actionTypes.PAY_WITH_NEW_CARD,
  };
}
