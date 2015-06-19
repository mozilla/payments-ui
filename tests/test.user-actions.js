'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');


describe('UserActions', function() {

  var dispatcher;
  var userActions;

  beforeEach(function() {
    dispatcher = {
      dispatch: function() {},
    };
    sinon.spy(dispatcher, 'dispatch');

    userActions = rewire('user-actions');
    userActions.__set__({
      dispatcher: dispatcher,
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

  it('should dispatch current user', function() {
    var user = {email: 'foo@bar.com'};
    userActions.setCurrentUser(user);
    assert.deepEqual(dispatcher.dispatch.args[0][0], {
      actionType: 'set-user',
      user: user,
    });
  });

  it('should set user from sign-in', function() {
    var data = setApiSignInResult();
    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    var userData = setUser.firstCall.args[0];
    assert.equal(userData.email, data.buyer_email);
    assert.equal(userData.is_logged_in, true);
  });

  it('should set saved payment methods', function() {
    var data = fakeSignInResult();
    var payMethods = [{'provider_id': '3vr3ym'}];
    data.payment_methods = payMethods;
    setApiSignInResult({data: data});

    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    var userData = setUser.firstCall.args[0];
    assert.equal(userData.payment_methods, payMethods);
  });

  it('should set empty payment methods', function() {
    setApiSignInResult();
    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    var userData = setUser.firstCall.args[0];
    assert.deepEqual(userData.payment_methods, []);
  });

  it('should sign-in with access token', function() {
    var jquery = helpers.fakeJquery({returnedData: fakeSignInResult()});
    userActions.__set__('$', jquery.stub);
    userActions.signIn('access-token');

    assert.equal(jquery.ajaxSpy.firstCall.args[0].data.access_token,
                 'access-token');
  });

  it('should configure CSRF headers on sign-in', function() {
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});
    userActions.__set__('$', jquery.stub);
    userActions.signIn('access-token');

    assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                     {'X-CSRFToken': data.csrf_token});
  });

  it('should set signed out user on failure', function() {
    setApiSignInResult({jqueryOpt: {result: 'fail'}});
    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    var userData = setUser.firstCall.args[0];
    assert.equal(userData.email, null);
    assert.equal(userData.is_logged_in, false);
  });

});
