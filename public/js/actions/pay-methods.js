import $ from 'jquery';
import braintree from 'braintree-web';

import * as actionTypes from 'constants/action-types';
import * as appActions from './app';


export function getPayMethods() {
  // Note: not currently used as payMethods
  // are added to user state upon login.
  return dispatch => {
    $.ajax({
      method: 'get',
      url: '/api/braintree/mozilla/paymethod/',
      context: this,
    }).then(function(data) {
      dispatch({
        type: actionTypes.GET_PAY_METHODS,
        user: {
          payMethods: data,
        },
      });
    }).fail(function() {
      console.log('Retrieving cards failed');
      dispatch(appActions.error('Retrieving cards failed'));
    });
  };
}


export function addCreditCard(braintreeToken, creditCard, jquery=$,
                              BraintreeClient=braintree.api.Client) {
  return (dispatch) => {
    var client = new BraintreeClient({
      clientToken: braintreeToken,
    });
    client.tokenizeCard({
      number: creditCard.number,
      expirationDate: creditCard.expiration,
      cvv: creditCard.cvv,
    }, function(err, nonce) {
      if (err) {
        console.error('Braintree tokenization error:', err);
        dispatch(appActions.error('Braintree tokenization error'));
      } else {
        jquery.ajax({
          data: {
            pay_method_nonce: nonce,
          },
          url: '/api/braintree/mozilla/paymethod/',
          method: 'post',
          dataType: 'json',
        }).then(data => {
          console.log('Successfully added a card');
          dispatch({
            type: actionTypes.GET_PAY_METHODS,
            management: {
              tab: actionTypes.SHOW_ADD_PAY_METHOD,
            },
            user: {
              payMethods: data,
            },
          });
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
