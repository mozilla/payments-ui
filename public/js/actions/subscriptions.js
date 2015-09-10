import * as actionTypes from 'constants/action-types';

import * as api from './api';
import * as appActions from './app';
import * as transactionActions from './transaction';


export function getUserSubscriptions(fetch=api.fetch) {
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.LOADING_USER_SUBSCRIPTIONS,
    });

    fetch({
      method: 'get',
      url: '/braintree/subscriptions/',
      context: this,
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(data => {
      console.log('got subscriptions from API:', data);
      dispatch({
        type: actionTypes.GOT_USER_SUBSCRIPTIONS,
        subscriptions: data.subscriptions,
      });
    }).fail(apiError => {
      console.log('error getting subscriptions:', apiError.responseJSON);
      dispatch(appActions.error('failed to get subscriptions'));
    });

  };
}


export function createSubscription({dispatch, productId,
                                    getState, payNonce, payMethodUri,
                                    fetch=api.fetch}) {
  var data = {
    plan_id: productId,
  };
  data.pay_method_uri = payMethodUri;
  data.pay_method_nonce = payNonce;

  return fetch({
    data: data,
    url: '/braintree/subscriptions/',
    method: 'post',
  }, {
    csrfToken: getState().app.csrfToken,
  }).then(() => {
    console.log('Successfully subscribed + completed payment');
    dispatch(transactionActions.complete());
  }).fail($xhr => {
    if (data.pay_method_nonce) {
      dispatch({
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: $xhr.responseJSON,
      });
    } else {
      dispatch(appActions.error('Subscription creation failed'));
    }
  });
}
