'use strict';

var actionTypes = require('action-types');
var appActions = require('app-actions');
var dataStore = require('data-store');


describe('appStore', function() {

  function appWithError() {
    return {
      error: {
        debugMessage: 'some informative message',
      },
    };
  }

  it('should initialize an app', function() {
    var app = dataStore.app(undefined, {});
    assert.deepEqual(app, {});
  });

  it('should set an app error', function() {
    var dispatchedApp = appWithError();

    var app = dataStore.app(
      {}, appActions.error(dispatchedApp.error.debugMessage));

    assert.deepEqual(app, dispatchedApp);
  });

  it('should preserve app state', function() {
    var dispatchedApp = appWithError();
    var state = {};

    // Receive an error action:
    state.app = dataStore.app(
      state, appActions.error(dispatchedApp.error.debugMessage));
    // Receive and ignore some other action:
    state.app = dataStore.app(state.app, {});

    assert.deepEqual(state.app, dispatchedApp);
  });

});


describe('userStore', function() {

  function userData() {
    return {
      email: 'f@f.com',
      payment_methods: [{provider_id: '1234'}],
    };
  }

  function userSignedIn(user) {
    user = user || userData();
    return {
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    };
  }

  it('should initialize an empty user', function() {
    var user = dataStore.user(undefined, {});
    assert.deepEqual(user, {});
  });

  it('should return a user on sign-in', function() {
    var dispatchedUser = userData();

    var user = dataStore.user({}, userSignedIn());

    assert.deepEqual(user, dispatchedUser);
  });

  it('should preserve user state', function() {
    var dispatchedUser = userData();
    var state = {};

    // Receive a user action:
    state.user = dataStore.user(state.user, userSignedIn());

    // Receive and ignore another action:
    state.user = dataStore.user(state.user, {});

    assert.deepEqual(state.user, dispatchedUser);
  });

});
