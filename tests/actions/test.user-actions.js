import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as userActions from 'actions/user';

import * as helpers from '../helpers';


describe('userActions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function fakeSignInResult() {
    return {
      braintreeToken: null,
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

  function tokenSignIn({accessToken='some-access-token', api=null,
                        fetch=null}) {
    if (!api) {
      api= {
        fetch: fetch,
        setCSRFToken: sinon.stub(),
      };
    }
    userActions.tokenSignIn(accessToken, api)(dispatchSpy);
  }

  describe('tokenSignIn', function() {

    it('should dispatch sign-in action', function() {
      var { fetch } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should set the email from sign-in', function() {
      var { fetch, data } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { fetch } = setApiSignInResult({data: data});

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

    it('should set empty payment methods', function() {
      var { fetch } = setApiSignInResult();

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action.user.payMethods, []);
    });

    it('should sign-in with access token', function() {
      var fetch = helpers.fakeFetch({returnedData: fakeSignInResult()});
      tokenSignIn({fetch: fetch, accessToken: 'this-access-token'});

      assert.equal(fetch.firstCall.args[0].data.access_token,
                   'this-access-token');
    });

    it('should configure CSRF headers on sign-in', function() {
      var data = fakeSignInResult();
      var fetch = helpers.fakeFetch({returnedData: data});
      var api = {
        fetch: fetch,
        setCSRFToken: sinon.stub(),
      };
      tokenSignIn({api: api});

      assert.deepEqual(api.setCSRFToken.firstCall.args[0], data.csrf_token);
    });

    it('should set app error on failure', function() {
      var { fetch } = setApiSignInResult({fetchOpt: {result: 'fail'}});

      tokenSignIn({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('FxA token sign-in failed'));
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

    function signInAction({fetch=null, api=null}) {
      if (!api) {
        api = {
          fetch: fetch,
          setCSRFToken: sinon.stub(),
        };
      }
      userActions.userSignIn(fxaSignIn.client, api)(dispatchSpy);
    }

    function resolveSignIn() {
      fxaSignIn.promise.resolve({code: 'fxa-auth-code'});
    }

    beforeEach(function() {
      fxaSignIn = setFxaRelierStub();
    });

    it('should dispatch a sign-in action', function() {
      var { fetch } = setApiSignInResult();

      signInAction({fetch: fetch});
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should dispatch an FxA sign-in error', function() {
      var { fetch } = setApiSignInResult();

      signInAction({fetch: fetch});

      var fxaError = new Error('some FxA error');
      fxaSignIn.promise.reject(fxaError);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('FxA user sign-in failed'));
    });

    it('should dispatch an API sign-in error', function() {
      var { fetch } = setApiSignInResult({fetchOpt: {result: 'fail'}});

      signInAction({fetch: fetch});
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('API user sign-in failed'));
    });

    it('should configure CSRF headers on sign-in', function() {
      var data = fakeSignInResult();
      var fetch = helpers.fakeFetch({returnedData: data});
      var api = {
        fetch: fetch,
        setCSRFToken: sinon.spy(),
      };
      signInAction({api: api});
      resolveSignIn();

      assert.deepEqual(api.setCSRFToken.firstCall.args[0],
                       data.csrf_token);
    });

    it('should set the email from sign-in', function() {
      var { fetch, data } = setApiSignInResult();

      signInAction({fetch: fetch});
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { fetch } = setApiSignInResult({data: data});

      signInAction({fetch: fetch});
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

  });

  describe('userSignOut', function() {

    it('should dispatch a sign-out action', function() {
      var fetch = helpers.fakeFetch();

      userActions.userSignOut(fetch)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_OUT);
    });

    it('should dispatch a sign-out error', function() {
      var fetch = helpers.fakeFetch({result: 'fail'});

      userActions.userSignOut(fetch)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('API user sign-out failed'));
    });

  });

});
