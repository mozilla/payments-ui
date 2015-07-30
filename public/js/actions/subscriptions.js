import $ from 'jquery';
import braintree from 'braintree-web';

import * as actionTypes from 'constants/action-types';

import * as appActions from './app';
import * as purchaseActions from './purchase';


export function getUserSubscriptions(jquery=$) {
  return dispatch => {

    dispatch({
      type: actionTypes.LOADING_USER_SUBSCRIPTIONS,
    });

    jquery.ajax({
      method: 'get',
      url: '/api/braintree/subscriptions/',
      context: this,
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


export function createSubscription(braintreeToken, productId,
                                   creditCard, jquery=$,
                                   BraintreeClient=braintree.api.Client) {
  return dispatch => {

    var client = new BraintreeClient({
      clientToken: braintreeToken,
    });

    client.tokenizeCard({
      number: creditCard.number,
      expirationDate: creditCard.expiration,
      cvv: creditCard.cvv,
    }, (err, nonce) => {
      if (err) {
        console.error('Braintree tokenization error:', err);
        dispatch(appActions.error('Braintree tokenization error'));
      } else {
        jquery.ajax({
          data: {
            pay_method_nonce: nonce,
            plan_id: productId,
          },
          url: '/api/braintree/subscriptions/',
          method: 'post',
          dataType: 'json',
        }).then(() => {
          console.log('Successfully subscribed + completed payment');
          dispatch(purchaseActions.complete());
        }).fail($xhr => {
          dispatch({
            type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
            apiErrorResult: $xhr.responseJSON,
          });
        });
      }
    });

  };
}
