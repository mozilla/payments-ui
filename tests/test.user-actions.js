'use strict';

var rewire = require('rewire');

var actionTypes = require('action-types');
var appActions = require('app-actions');

var helpers = require('./helpers');


describe('userActions', function() {

  var dispatchSpy;
  var userActions;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
    userActions = rewire('user-actions');
    userActions.__set__({
      // Replace with a non-functioning stub by default until overidden.
      '$': {},
    });
  });

  function fakeSignInResult() {
    return {
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
    userActions.__set__('$', jquery.stub);

    return opt.data;
  }

  it('should dispatch sign-in action', function() {
    setApiSignInResult();

    userActions.signIn('access-token')(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.type, actionTypes.USER_SIGNED_IN);
  });

  it('should set email from sign-in', function() {
    var data = setApiSignInResult();

    userActions.signIn('access-token')(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.user.email, data.buyer_email);
  });

  it('should set saved payment methods from sign-in', function() {
    var data = fakeSignInResult();
    var payMethods = [{'provider_id': '3vr3ym'}];
    data.payment_methods = payMethods;
    setApiSignInResult({data: data});

    userActions.signIn('access-token')(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.user.payment_methods, payMethods);
  });

  it('should set empty payment methods', function() {
    setApiSignInResult();

    userActions.signIn('access-token')(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.deepEqual(action.user.payment_methods, []);
  });

  it('should sign-in with access token', function() {
    var jquery = helpers.fakeJquery({returnedData: fakeSignInResult()});
    userActions.__set__('$', jquery.stub);
    userActions.signIn('access-token')(dispatchSpy);

    assert.equal(jquery.ajaxSpy.firstCall.args[0].data.access_token,
                 'access-token');
  });

  it('should configure CSRF headers on sign-in', function() {
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});
    userActions.__set__('$', jquery.stub);
    userActions.signIn('access-token')(dispatchSpy);

    assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                     {'X-CSRFToken': data.csrf_token});
  });

  it('should set app error on failure', function() {
    setApiSignInResult({jqueryOpt: {result: 'fail'}});

    userActions.signIn('access-token')(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.deepEqual(action, appActions.error('user login failed'));
  });

});
