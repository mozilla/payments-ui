import braintree from 'braintree-web';

import * as actionTypes from 'constants/action-types';
import * as products from 'products';

import * as appActions from './app';
import * as api from './api';
import { tokenizeCreditCard } from './braintree';
import { _createSubscription as
         defaultCreateSubscription } from './subscriptions';


export function complete({userEmail} = {}) {
  return {
    type: actionTypes.COMPLETE_TRANSACTION,
    userEmail: userEmail,
  };
}


export function payWithNewCard() {
  return {
    type: actionTypes.PAY_WITH_NEW_CARD,
  };
}


export function _processOneTimePayment({dispatch, productId, getState,
                                        payNonce, payMethodUri,
                                        fetch=api.fetch,
                                        userDefinedAmount}) {
  var data = {
    product_id: productId,
  };

  if (userDefinedAmount) {
    console.log('_processOneTimePayment was passed a userDefinedAmount',
                userDefinedAmount);
    data.amount = userDefinedAmount;
  }

  data.paymethod = payMethodUri;
  data.nonce = payNonce;

  return fetch({
    data: data,
    url: '/braintree/sale/',
    method: 'post',
  }, {
    csrfToken: getState().app.csrfToken,
  }).then(() => {
    console.log('Successfully completed sale');
    dispatch(complete());
  }).fail($xhr => {
    if (data.nonce) {
      dispatch({
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: $xhr.responseJSON,
      });
    } else {
      dispatch(appActions.error('product sale failed'));
    }
  });
}


export function processPayment({productId, braintreeToken, creditCard,
                                payMethodUri,
                                BraintreeClient=braintree.api.Client,
                                createSubscription=defaultCreateSubscription,
                                payOnce=_processOneTimePayment,
                                ...args}) {
  return (dispatch, getState) => {
    var product = products.get(productId);
    var payForProduct;

    if (product.recurrence === 'monthly') {
      console.log('calling _createSubscription for product',
                  product.id);
      payForProduct = createSubscription;
    } else {
      console.log('calling _processOneTimePayment for product',
                  product.id);
      payForProduct = payOnce;
    }

    var payArgs = {
      dispatch: dispatch,
      getState: getState,
      productId: productId,
      ...args,
    };

    if (creditCard) {
      tokenizeCreditCard({
        dispatch: dispatch,
        braintreeToken: braintreeToken,
        BraintreeClient: BraintreeClient,
        creditCard: creditCard,
        callback: (nonce) => payForProduct({payNonce: nonce, ...payArgs}),
      });
    } else if (payMethodUri) {
      payForProduct({payMethodUri: payMethodUri, ...payArgs});
    } else {
      throw new Error('Either creditCard or payMethodUri is required.');
    }
  };
}


export function getUserTransactions(fetch=api.fetch) {
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.LOADING_USER_TRANSACTIONS,
    });

    fetch({
      method: 'get',
      url: '/braintree/transactions/',
    }, {
      csrfToken: getState().app.csrfToken,
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
