import * as actionTypes from 'constants/action-types';

import * as api from './api';
import * as appActions from './app';
import * as transactionActions from './transaction';


export function getUserSubscriptions(fetch=api.fetch) {
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.LOADING_USER_SUBS,
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
        type: actionTypes.GOT_USER_SUBS,
        subscriptions: data.subscriptions,
      });
    }).fail(apiError => {
      console.log('error getting subscriptions:', apiError.responseJSON);
      dispatch(appActions.error('failed to get subscriptions'));
    });

  };
}


export function getSubsByPayMethod(payMethodUri, fetch=api.fetch) {
  // TODO This should be a specific API request
  // see https://github.com/mozilla/payments-service/issues/127
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.LOADING_FILTERED_USER_SUBS,
    });

    fetch({
      method: 'get',
      url: '/braintree/subscriptions/',
      context: this,
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(data => {
      console.log('got subscriptions from API:', data);
      var filteredSubs = data.subscriptions.filter(
        item => item.paymethod === payMethodUri);
      dispatch({
        type: actionTypes.GOT_SUBS_BY_PAY_METHOD,
        subscriptions: filteredSubs,
        payMethodUri: payMethodUri,
      });
    }).fail(apiError => {
      console.log('error getting filtered subscriptions:',
                  apiError.responseJSON);
      dispatch(appActions.error('failed to get subscriptions by pay method'));
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


export function updateSubPayMethod(subscriptionUri, newPayMethodUri,
                                   fetch=api.fetch) {
  var data = {
    new_pay_method_uri: newPayMethodUri,
    subscription_uri: subscriptionUri,
  };

  // Note: The caller is responsible for dispatching based on error/succcess.
  return (dispatch, getState) => {
    return fetch({
      data: data,
      url: '/braintree/subscriptions/paymethod/change/',
      method: 'post',
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(() => {
      console.log('Successfully updated subscription: ' + subscriptionUri +
                  ' to use payMethod: ' + newPayMethodUri);
    }).fail(() => {
      console.error('Failed to update subscription: ' + subscriptionUri +
                    ' to use payMethod: ' + newPayMethodUri);
    });
  };
}
