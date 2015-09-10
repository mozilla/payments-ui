import braintree from 'braintree-web';

import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as api from './api';
import * as notificationActions from './notifications';
import * as mgmtActions from './management';


export function delPayMethod(payMethodUri, fetch=api.fetch) {

  if (typeof payMethodUri === 'undefined') {
    throw new Error('payMethodUri is undefined');
  }

  return (dispatch, getState) => {
    return fetch({
      method: 'post',
      url: '/braintree/paymethod/delete/',
      data: {
        pay_method_uri: payMethodUri,
      },
      context: this,
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(function(data) {
      dispatch({
        type: actionTypes.GOT_PAY_METHODS,
        payMethods: data.payment_methods,
      });
      dispatch(mgmtActions.showPayMethods());
    }).fail(function() {
      console.log('Deleting pay method failed');
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.PAY_METHOD_DELETION_FAILED}));
    });
  };
}


export function getPayMethods(fetch=api.fetch) {
  // Note: not currently used as payMethods
  // are added to user state upon sign-in.
  return (dispatch, getState) => {
    fetch({
      method: 'get',
      url: '/braintree/mozilla/paymethod/',
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(function(data) {
      dispatch({
        type: actionTypes.GOT_PAY_METHODS,
        payMethods: data,
      });
    }).fail(function() {
      console.log('Retrieving pay methods failed');
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.PAY_METHOD_GET_FAILED}));
    });
  };
}


export function addCreditCard(braintreeToken, creditCard, fetch=api.fetch,
                              BraintreeClient=braintree.api.Client) {
  return (dispatch, getState) => {
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
        dispatch(notificationActions.showError(
          {errorCode: errorCodes.BRAINTREE_TOKENIZATION_ERROR}));
      } else {
        fetch({
          data: {
            nonce: nonce,
          },
          url: '/braintree/paymethod/',
          method: 'post',
        }, {
          csrfToken: getState().app.csrfToken,
        }).then(data => {
          console.log('Successfully added a pay method. API Result:', data);
          dispatch({
            type: actionTypes.GOT_PAY_METHODS,
            payMethods: data.payment_methods,
          });
          dispatch(mgmtActions.showPayMethods());
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

