'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');


describe('UserActions', function() {

  var dispatcher;
  var appActions;
  var userActions;

  beforeEach(function() {

    appActions = {
      setError: sinon.spy(),
    };

    dispatcher = {
      dispatch: sinon.spy(),
    };

    userActions = rewire('user-actions');
    userActions.__set__({
      dispatcher: dispatcher,
      AppActions: appActions,
      // Replace with a non-functioning stub by default until overidden.
      '$': {},
    });

    sinon.spy(userActions, 'setSignedInUser');

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

  it('should dispatch signed in user', function() {
    var user = {email: 'foo@bar.com'};
    userActions.setSignedInUser(user);
    assert.deepEqual(dispatcher.dispatch.args[0][0], {
      actionType: 'user-signed-in',
      user: user,
    });
  });

  it('should set email from sign-in', function() {
    var data = setApiSignInResult();

    userActions.signIn('access-token');

    var userData = userActions.setSignedInUser.firstCall.args[0];
    assert.equal(userData.email, data.buyer_email);
  });

  it('should set saved payment methods from sign-in', function() {
    var data = fakeSignInResult();
    var payMethods = [{'provider_id': '3vr3ym'}];
    data.payment_methods = payMethods;
    setApiSignInResult({data: data});

    userActions.signIn('access-token');

    var userData = userActions.setSignedInUser.firstCall.args[0];
    assert.equal(userData.payment_methods, payMethods);
  });

  it('should set empty payment methods', function() {
    setApiSignInResult();

    userActions.signIn('access-token');

    var userData = userActions.setSignedInUser.firstCall.args[0];
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

  it('should set app error on failure', function() {
    setApiSignInResult({jqueryOpt: {result: 'fail'}});

    userActions.signIn('access-token');

    assert.ok(appActions.setError.called);
    assert.ok(!userActions.setSignedInUser.called);
  });

});
