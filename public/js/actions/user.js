import $ from 'jquery';

import * as appActions from './app';
import * as actionTypes from 'constants/action-types';


export function signIn(accessToken, jquery=$) {
  return function(dispatch) {
    jquery.ajax({
      data: {
        access_token: accessToken,
      },
      method: 'post',
      url: '/api/auth/sign-in/',
      context: this,
    }).then(function(data) {

      console.log('setting CSRF token for subsequent requests:',
                  data.csrf_token);
      jquery.ajaxSetup({
        headers: {
          'X-CSRFToken': data.csrf_token,
        },
      });

      console.log('login succeeded, setting user');
      dispatch({
        type: actionTypes.USER_SIGNED_IN,
        user: {
          email: data.buyer_email,
          payment_methods: data.payment_methods,
        },
      });

    }).fail(function() {

      console.log('login failed');
      dispatch(appActions.error('user login failed'));

    });
  };
}
