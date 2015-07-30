import $ from 'jquery';

import * as actionTypes from 'constants/action-types';
import * as settings from 'settings';

import * as appActions from './app';


function setUpCSRF(csrfToken, jquery) {
  console.log('setting CSRF token for subsequent requests:', csrfToken);
  jquery.ajaxSetup({
    headers: {
      'X-CSRFToken': csrfToken,
    },
  });
}


export function tokenSignIn(accessToken, jquery=$) {
  return dispatch => {
    jquery.ajax({
      data: {
        access_token: accessToken,
      },
      method: 'post',
      url: '/api/auth/sign-in/',
      context: this,
    }).then(data => {

      setUpCSRF(data.csrf_token, jquery);

      console.log('login succeeded, setting user');
      dispatch({
        type: actionTypes.USER_SIGNED_IN,
        user: {
          email: data.buyer_email,
          payMethods: data.payment_methods,
        },
      });

    }).fail(apiError => {

      console.log('FxA token sign-in failure:', apiError.responseJSON);
      dispatch(appActions.error('FxA token sign-in failed'));

    });
  };
}


export function userSignIn(FxaClient=window.FxaRelierClient, jquery=$) {
  return dispatch => {
    console.log('signing in FxA user');

    // FIXME: use require when we get
    // https://github.com/mozilla/fxa-relier-client/issues/68
    var fxaClient = new FxaClient(settings.fxaClientId, {
      contentHost: settings.fxaContentHost,
      oauthHost: settings.fxaOauthHost,
    });

    fxaClient.auth.signIn({
      // TODO: use state here to check for CSRF? It might be for redirects only
      // which wouldn't apply since we're using the lightbox.
      state: 'n',
      redirectUri: settings.fxaRedirectUri,
      ui: 'lightbox',
      scope: 'profile:email payments',
    })
    .then(fxaResult => {
      console.log('FxA sign-in succeeded:', fxaResult);
      console.log('requesting token for code', fxaResult.code);

      jquery.ajax({
        type: 'post',
        url: '/api/auth/sign-in/',
        dataType: 'json',
        data: {
          authorization_code: fxaResult.code,
        },
      })
      .then(apiResult => {
        console.log('API sign-in suceeded; result:', apiResult);

        setUpCSRF(apiResult.csrf_token, jquery);

        dispatch({
          type: actionTypes.USER_SIGNED_IN,
          user: {
            email: apiResult.buyer_email,
            payMethods: apiResult.payment_methods,
          },
        });

      })
      .fail(apiError => {
        console.error('API user sign-in failure:', apiError.responseJSON);
        dispatch(appActions.error('API user sign-in failed'));
      });

    }, fxaError => {
      console.error('FxA sign-in failure:', fxaError);
      dispatch(appActions.error('FxA user sign-in failed'));
    });
  };
}


export function userSignOut(jquery=$) {
  return dispatch => {
    jquery.ajax({
      method: 'post',
      url: '/api/auth/sign-out/',
      context: this,
    }).then(() => {
      console.log('API user sign-out succeeded');

      dispatch({
        type: actionTypes.USER_SIGNED_OUT,
      });

    }).fail(apiError => {

      console.log('API user sign-out failure:', apiError.responseJSON);
      dispatch(appActions.error('API user sign-out failed'));

    });
  };
}


export function getBraintreeToken() {
  console.log('Requesting braintree token');
  return dispatch => {
    $.ajax({
      method: 'post',
      url: '/api/braintree/token/generate/',
      context: this,
    }).then(data => {
      dispatch({
        type: actionTypes.GOT_BRAINTREE_TOKEN,
        user: {
          braintreeToken: data.token,
        },
      });
    }).fail(apiError => {
      console.log('failed to get braintree token', apiError.responseJSON);
      dispatch(appActions.error('Failed to get a braintree token'));
    });
  };
}
