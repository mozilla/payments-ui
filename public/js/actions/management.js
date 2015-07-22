'use strict';

import $ from 'jquery';
import * as actionTypes from 'constants/action-types';


export function error(debugMessage) {
  return {
    type: actionTypes.APP_ERROR,
    error: {debugMessage: debugMessage},
  };
}

export function manageCards() {
  return function(dispatch) {
    $.ajax({
      method: 'get',
      url: '/api/braintree/mozilla/paymethod/',
      context: this,
    }).then(function(data) {
      dispatch({
        type: actionTypes.MANAGE_CARD_LIST,
        management: {
          paymentMethods: data,
        },
      });
    }).fail(function() {
      console.log('Retrieving cards failed');
      dispatch(error('Retrieving cards failed'));
    });
  };
}

export function closeModal() {
  console.log('closeModal');
  return {
    type: actionTypes.MANAGE_CLOSE_MODAL,
  };
}
