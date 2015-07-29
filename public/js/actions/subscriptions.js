import $ from 'jquery';

import * as actionTypes from 'constants/action-types';

import * as appActions from './app';


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
