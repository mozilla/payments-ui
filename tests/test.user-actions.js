'use strict';

var UserActions = require('user-actions');

var helpers = require('./helpers');


describe('UserActions', function() {

  var dispatcher;
  var userActions;

  beforeEach(function() {
    dispatcher = {
      dispatch: function() {},
    };
    sinon.spy(dispatcher, 'dispatch');
    userActions = new UserActions.Class(dispatcher);
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
    var setUser = sinon.spy(userActions, 'setCurrentUser');
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});

    userActions.signIn('access-token', {jquery: jquery.stub});

    assert.deepEqual(setUser.firstCall.args[0],
                     {email: data.buyer_email, is_logged_in: true});
  });

  it('should sign-in with access token', function() {
    var jquery = helpers.fakeJquery({returnedData: fakeSignInResult()});

    userActions.signIn('access-token', {jquery: jquery.stub});

    assert.equal(jquery.ajaxSpy.firstCall.args[0].data.access_token,
                 'access-token');
  });

  it('should configure CSRF headers on sign-in', function() {
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});

    userActions.signIn('access-token', {jquery: jquery.stub});

    assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                     {'X-CSRFToken': data.csrf_token});
  });

  it('should set signed out user on failure', function() {
    var setUser = sinon.spy(userActions, 'setCurrentUser');
    var jquery = helpers.fakeJquery({result: 'fail'});

    userActions.signIn('access-token', {jquery: jquery.stub});

    assert.deepEqual(setUser.firstCall.args[0],
                     {email: null, is_logged_in: false});
  });

});
