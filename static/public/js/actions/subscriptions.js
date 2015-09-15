import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';

import * as api from './api';
import * as notificationActions from './notifications';
import * as processingActions from './processing';
import * as transactionActions from './transaction';

import { gettext, arrayHasSubString } from 'utils';


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
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.SUBS_GET_FAILED}));
    });

  };
}


export function getSubsByPayMethod(payMethodUri, fetch=api.fetch) {
  // TODO This should be a specific API request
  // see https://github.com/mozilla/payments-service/issues/127
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.LOADING_SUBS_BY_PAY_METHOD,
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
      console.log('failed to get subscriptions by pay method:',
                  apiError.responseJSON);
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.SUBS_BY_PAY_METHOD_GET_FAILED}));
    });

  };
}

export function _createSubscription({dispatch, productId, processingId,
                                     getState, payNonce, payMethodUri,
                                     userDefinedAmount, email,
                                     fetch=api.fetch}) {
  var data = {
    plan_id: productId,
  };

  if (userDefinedAmount) {
    console.log('_createSubscription was passed a userDefinedAmount',
                userDefinedAmount);
    data.amount = userDefinedAmount;
  }

  if (email) {
    console.log('_createSubscription was passed an email', email);
    data.email = email;
  }

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
    dispatch(processingActions.stopProcessing(processingId));
    dispatch(transactionActions.complete({userEmail: email}));
  }).fail($xhr => {
    dispatch(processingActions.stopProcessing(processingId));
    if ($xhr.status === 400 && $xhr.responseJSON &&
        $xhr.responseJSON.error_response) {
      var allErrors = $xhr.responseJSON.error_response.__all__;
      if (allErrors && arrayHasSubString(allErrors, 'already subscribed')) {
        dispatch(notificationActions.showError({
          text: gettext('User is already subscribed to this product'),
          errorCode: errorCodes.ALREADY_SUBSCRIBED,
          userDismissable: false,
        }));
      } else if (data.pay_method_nonce) {
        dispatch({
          type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
          apiErrorResult: $xhr.responseJSON,
        });
      }
    } else {
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.SUB_CREATION_FAILED}));
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
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.SUB_UPDATE_FAILED}));
    });
  };
}
