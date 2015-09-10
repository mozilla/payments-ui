import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as userActions from 'actions/user';

import * as helpers from '../helpers';


describe('userActions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function fakeSignInResult() {
    return {
      buyer_email: 'person@somehwere.com',
      csrf_token: 'some-csrf-token',
      payment_methods: [],
    };
  }

  function setApiSignInResult({fetchOpt={}, data=fakeSignInResult()} = {}) {
    fetchOpt.returnedData = data;
    return {
      data: data,
      fetch: helpers.fakeFetch(fetchOpt),
    };
  }

  function tokenSignIn({accessToken='some-access-token', fetch}) {
    var deferredAction = userActions.tokenSignIn(accessToken, fetch);
    helpers.doApiAction(deferredAction, dispatchSpy);
  }

  describe('tokenSignIn', function() {

    it('should dispatch sign-in action', function() {
      var { fetch } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should set the email from sign-in', function() {
      var { fetch, data } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { fetch } = setApiSignInResult({data: data});

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

    it('should set empty payment methods', function() {
      var { fetch } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.secondCall.args[0];
      assert.deepEqual(action.user.payMethods, []);
    });

    it('should sign-in with access token', function() {
      var fetch = helpers.fakeFetch({returnedData: fakeSignInResult()});
      tokenSignIn({fetch: fetch, accessToken: 'this-access-token'});

      assert.equal(fetch.firstCall.args[0].data.access_token,
                   'this-access-token');
    });

    it('should dispatch a CSRF token', function() {
      var data = fakeSignInResult();
      var fetch = helpers.fakeFetch({returnedData: data});
      tokenSignIn({fetch: fetch});

      assert.deepEqual(dispatchSpy.firstCall.args[0], {
        type: actionTypes.GOT_CSRF_TOKEN,
        csrfToken: data.csrf_token,
      });
    });

    it('should set app error on failure', function() {
      var { fetch } = setApiSignInResult({fetchOpt: {result: 'fail'}});
      tokenSignIn({fetch: fetch});
      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.FXA_TOKEN_SIGN_IN_FAILURE);
    });

  });

  describe('userSignIn', function() {
    var fxaSignIn;

    function setFxaRelierStub(opt) {
      opt = opt || {};

      var signInPromise = new helpers.FakeSyncPromise();

      function FxaRelierClient() {}

      FxaRelierClient.prototype.auth = {
        signIn: function() {
          return signInPromise;
        },
      };

      return {
        client: FxaRelierClient,
        promise: signInPromise,
      };
    }

    function signInAction(fetch) {
      var deferredAction = userActions.userSignIn(
        fxaSignIn.client, fetch
      );
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    function resolveSignIn() {
      fxaSignIn.promise.resolve({code: 'fxa-auth-code'});
    }

    beforeEach(function() {
      fxaSignIn = setFxaRelierStub();
    });

    it('should dispatch a sign-in action', function() {
      var { fetch } = setApiSignInResult();

      signInAction(fetch);
      resolveSignIn();

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should dispatch an FxA sign-in error', function() {
      var { fetch } = setApiSignInResult();

      signInAction(fetch);

      var fxaError = new Error('some FxA error');
      fxaSignIn.promise.reject(fxaError);

      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.FXA_SIGN_IN_FAILURE);
    });

    it('should dispatch an API sign-in error', function() {
      var { fetch } = setApiSignInResult({fetchOpt: {result: 'fail'}});
      signInAction(fetch);
      resolveSignIn();
      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.API_SIGN_IN_FAILURE);
    });

    it('should dispatch CSRF token', function() {
      var data = fakeSignInResult();
      var fetch = helpers.fakeFetch({returnedData: data});
      signInAction(fetch);
      resolveSignIn();

      assert.deepEqual(dispatchSpy.firstCall.args[0], {
        type: actionTypes.GOT_CSRF_TOKEN,
        csrfToken: data.csrf_token,
      });
    });

    it('should set the email from sign-in', function() {
      var { fetch, data } = setApiSignInResult();

      signInAction(fetch);
      resolveSignIn();

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { fetch } = setApiSignInResult({data: data});

      signInAction(fetch);
      resolveSignIn();

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

  });

  describe('userSignOut', function() {

    function userSignOut(fetch) {
      var deferredAction = userActions.userSignOut(fetch);
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should dispatch a sign-out action', function() {
      var fetch = helpers.fakeFetch();

      userSignOut(fetch);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_OUT);
    });

    it('should dispatch a sign-out error', function() {
      var fetch = helpers.fakeFetch({result: 'fail'});

      userSignOut(fetch);

      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.API_SIGN_OUT_FAILURE);
    });

  });

  describe('getBraintreeToken', function() {

    function apiResult() {
      return {
        token: 'braintree-token',
        csrf_token: 'some-csrf-token',
      };
    }

    it('should dispatch GOT_CSRF_TOKEN', function() {
      var data = apiResult();
      var fetch = helpers.fakeFetch({
        returnedData: data,
      });

      userActions.getBraintreeToken(fetch)(dispatchSpy);

      assert.deepEqual(dispatchSpy.firstCall.args[0], {
        type: actionTypes.GOT_CSRF_TOKEN,
        csrfToken: data.csrf_token,
      });
    });

    it('should dispatch GOT_BRAINTREE_TOKEN', function() {
      var data = apiResult();
      var fetch = helpers.fakeFetch({
        returnedData: data,
      });

      userActions.getBraintreeToken(fetch)(dispatchSpy);

      assert.deepEqual(dispatchSpy.secondCall.args[0], {
        type: actionTypes.GOT_BRAINTREE_TOKEN,
        braintreeToken: data.token,
      });
    });

    it('should dispatch an app error', function() {
      var fetch = helpers.fakeFetch({result: 'fail'});

      userActions.getBraintreeToken(fetch)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.BRAINTREE_TOKEN_GET_FAILED);
    });

  });

});
