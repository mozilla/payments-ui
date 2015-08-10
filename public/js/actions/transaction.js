import * as actionTypes from 'constants/action-types';

import * as appActions from './app';
import * as api from './api';


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


export function getUserTransactions(fetch=api.fetch) {
  return dispatch => {

    dispatch({
      type: actionTypes.LOADING_USER_TRANSACTIONS,
    });

    fetch({
      method: 'get',
      url: '/braintree/transactions/',
    }).then(data => {
      console.log('got transactions from API:', data);
      dispatch({
        type: actionTypes.GOT_USER_TRANSACTIONS,
        transactions: data.transactions,
      });
    }).fail(apiError => {
      console.log('error getting transactions:', apiError.responseJSON);
      dispatch(appActions.error('failed to get transactions'));
    });
  };
}
