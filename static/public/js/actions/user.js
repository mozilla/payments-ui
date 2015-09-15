import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as settings from 'settings';

import * as api from './api';
import * as notificationActions from './notifications';


export function tokenSignIn(accessToken, fetch=api.fetch) {
  return dispatch => {
    fetch({
      data: {
        access_token: accessToken,
      },
      method: 'post',
      url: '/auth/sign-in/',
    }, {
      csrfToken: false,
    }).then(data => {

      dispatch({
        type: actionTypes.GOT_CSRF_TOKEN,
        csrfToken: data.csrf_token,
      });

      dispatch({
        type: actionTypes.USER_SIGNED_IN,
        user: {
          email: data.buyer_email,
          payMethods: data.payment_methods,
        },
      });

    }).fail(apiError => {
      console.log('FxA token sign-in failure:', apiError.responseJSON);
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.FXA_TOKEN_SIGN_IN_FAILURE}));
    });
  };
}


export function userSignIn(FxaClient=window.FxaRelierClient, fetch=api.fetch) {
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

      fetch({
        type: 'post',
        url: '/auth/sign-in/',
        data: {
          authorization_code: fxaResult.code,
          client_id: settings.fxaClientId,
        },
      }, {
        csrfToken: false,
      })
      .then(apiResult => {
        console.log('API sign-in suceeded; result:', apiResult);

        dispatch({
          type: actionTypes.GOT_CSRF_TOKEN,
          csrfToken: apiResult.csrf_token,
        });

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
        dispatch(notificationActions.showError(
          {errorCode: errorCodes.API_SIGN_IN_FAILURE}));
      });

    }, fxaError => {
      console.error('FxA sign-in failure:', fxaError);
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.FXA_SIGN_IN_FAILURE}));
    });
  };
}


export function userSignOut(fetch=api.fetch) {
  return (dispatch, getState) => {
    fetch({
      method: 'post',
      url: '/auth/sign-out/',
    }, {
      csrfToken: getState().app.csrfToken,
    }).then(() => {
      console.log('API user sign-out succeeded');

      dispatch({
        type: actionTypes.USER_SIGNED_OUT,
      });

    }).fail(apiError => {

      console.log('API user sign-out failure:', apiError.responseJSON);
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.API_SIGN_OUT_FAILURE}));
    });
  };
}


export function getBraintreeToken(fetch=api.fetch) {
  console.log('Requesting braintree token');
  return dispatch => {
    fetch({
      method: 'post',
      url: '/braintree/token/generate/',
    }, {
      csrfToken: false,
    }).then(data => {

      dispatch({
        type: actionTypes.GOT_CSRF_TOKEN,
        csrfToken: data.csrf_token,
      });

      dispatch({
        type: actionTypes.GOT_BRAINTREE_TOKEN,
        braintreeToken: data.token,
      });

    }).fail(apiError => {
      console.log('failed to get braintree token', apiError.responseJSON);
      dispatch(notificationActions.showError(
        {errorCode: errorCodes.BRAINTREE_TOKEN_GET_FAILED}));
    });
  };
}
