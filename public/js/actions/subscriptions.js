import $ from 'jquery';
import braintree from 'braintree-web';

import * as actionTypes from 'constants/action-types';

import * as appActions from './app';
import * as transactionActions from './transaction';


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


export function createSubscription(productId, payMethod,
                                   braintreeToken, jquery=$,
                                   BraintreeClient=braintree.api.Client) {
  return dispatch => {

    function requestSub(opts={}) {
      var data = {
        plan_id: productId,
      };
      data.pay_method_uri = opts.payMethodUri;
      data.pay_method_nonce = opts.nonce;

      return jquery.ajax({
        data: data,
        url: '/api/braintree/subscriptions/',
        method: 'post',
        dataType: 'json',
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

    // Check to see if payMethod is a card object
    if (typeof payMethod === 'object') {
      if (typeof payMethod.number === 'undefined' ||
          typeof payMethod.cvv === 'undefined' ||
          typeof payMethod.expiration === 'undefined') {
        throw new Error('Invalid card object');
      }

      var client = new BraintreeClient({
        clientToken: braintreeToken,
      });

      client.tokenizeCard({
        number: payMethod.number,
        expirationDate: payMethod.expiration,
        cvv: payMethod.cvv,
      }, (err, nonce) => {
        if (err) {
          console.error('Braintree tokenization error:', err);
          dispatch(appActions.error('Braintree tokenization error'));
        } else {
          requestSub({nonce: nonce});
        }
      });
    // Check for a payMethodUri
    } else if (typeof payMethod === 'string') {
      requestSub({payMethodUri: payMethod});
    } else {
      throw new Error('Unrecognized payMethod should be a card ' +
                      '(object) or payMethodUri (string)');
    }
  };
}
