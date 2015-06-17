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
    };
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
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});
    userActions.__set__('$', jquery.stub);

    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    assert.deepEqual(setUser.firstCall.args[0],
                     {email: data.buyer_email, is_logged_in: true});
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
    var jquery = helpers.fakeJquery({result: 'fail'});
    userActions.__set__('$', jquery.stub);
    var setUser = sinon.spy(userActions, 'setCurrentUser');

    userActions.signIn('access-token');

    assert.deepEqual(setUser.firstCall.args[0],
                     {email: null, is_logged_in: false});
  });

});
