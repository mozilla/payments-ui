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

  function setApiSignInResult(opt) {
    opt = opt || {};
    opt.data = opt.data || fakeSignInResult();

    opt.jqueryOpt = opt.jqueryOpt || {};
    opt.jqueryOpt.returnedData = opt.data;

    var jquery = helpers.fakeJquery(opt.jqueryOpt);

    return {
      data: opt.data,
      jquery: jquery.stub,
    };
  }

  describe('tokenSignIn', function() {

    it('should dispatch sign-in action', function() {
      var { jquery } = setApiSignInResult();

      userActions.tokenSignIn('access-token', jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should set the email from sign-in', function() {
      var { jquery, data } = setApiSignInResult();

      userActions.tokenSignIn('access-token', jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { jquery } = setApiSignInResult({data: data});

      userActions.tokenSignIn('access-token', jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

    it('should set empty payment methods', function() {
      var { jquery } = setApiSignInResult();

      userActions.tokenSignIn('access-token', jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action.user.payMethods, []);
    });

    it('should sign-in with access token', function() {
      var jquery = helpers.fakeJquery({returnedData: fakeSignInResult()});
      userActions.tokenSignIn('access-token', jquery.stub)(dispatchSpy);

      assert.equal(jquery.ajaxSpy.firstCall.args[0].data.access_token,
                   'access-token');
    });

    it('should configure CSRF headers on sign-in', function() {
      var data = fakeSignInResult();
      var jquery = helpers.fakeJquery({returnedData: data});
      userActions.tokenSignIn('access-token', jquery.stub)(dispatchSpy);

      assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                       {'X-CSRFToken': data.csrf_token});
    });

    it('should set app error on failure', function() {
      var { jquery } = setApiSignInResult({jqueryOpt: {result: 'fail'}});

      userActions.tokenSignIn('access-token', jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('FxA token sign-in failed'));
    });

  });

  describe('userSignIn', function() {
    var fxaSignIn;

    function setFxaRelierStub(opt) {
      opt = opt || {};

      var signInPromise = new helpers.FakeSyncPromise();

      function FxaRelierClient() {
      }

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

    function signInAction(jquery) {
      userActions.userSignIn(fxaSignIn.client, jquery)(dispatchSpy);
    }

    function resolveSignIn() {
      fxaSignIn.promise.resolve({code: 'fxa-auth-code'});
    }

    beforeEach(function() {
      fxaSignIn = setFxaRelierStub();
    });

    it('should dispatch a sign-in action', function() {
      var { jquery } = setApiSignInResult();

      signInAction(jquery);
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_IN);
    });

    it('should dispatch an FxA sign-in error', function() {
      var { jquery } = setApiSignInResult();

      signInAction(jquery);

      var fxaError = new Error('some FxA error');
      fxaSignIn.promise.reject(fxaError);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('FxA user sign-in failed'));
    });

    it('should dispatch an API sign-in error', function() {
      var { jquery } = setApiSignInResult({jqueryOpt: {result: 'fail'}});

      signInAction(jquery);
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('API user sign-in failed'));
    });

    it('should configure CSRF headers on sign-in', function() {
      var data = fakeSignInResult();
      var jquery = helpers.fakeJquery({returnedData: data});

      signInAction(jquery.stub);
      resolveSignIn();

      assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                       {'X-CSRFToken': data.csrf_token});
    });

    it('should set the email from sign-in', function() {
      var { jquery, data } = setApiSignInResult();

      signInAction(jquery);
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.email, data.buyer_email);
    });

    it('should set saved payment methods from sign-in', function() {
      var data = fakeSignInResult();
      var payMethods = [{'provider_id': '3vr3ym'}];
      data.payment_methods = payMethods;
      var { jquery } = setApiSignInResult({data: data});

      signInAction(jquery);
      resolveSignIn();

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.user.payMethods, payMethods);
    });

  });

  describe('userSignOut', function() {

    it('should dispatch a sign-out action', function() {
      var jquery = helpers.fakeJquery();

      userActions.userSignOut(jquery.stub)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.USER_SIGNED_OUT);
    });

    it('should dispatch a sign-out error', function() {
      var jquery = helpers.fakeJquery({result: 'fail'});

      userActions.userSignOut(jquery.stub)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, appActions.error('API user sign-out failed'));
    });

  });

});
