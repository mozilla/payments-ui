'use strict';

var Login = require('views/login');

var helpers = require('./helpers');

describe('Login', function() {

  beforeEach(function() {
    var routed = helpers.getRoutedComponent(Login);
    this.Login = routed.component;

    var stubs = helpers.getUserStubs();

    this.Login.UserActions = stubs.UserActions;
    this.Login.UserStore = stubs.UserStore;
  });

  it('should sign in on mount', function() {
    this.Login.componentDidMount();
    assert.ok(this.Login.UserActions.signIn.called);
  });

  it('should listen to user change', function() {
    this.Login.componentDidMount();
    var store = this.Login.UserStore;
    assert.equal(store.addSetUserListener.firstCall.args[0],
                 this.Login.onSetUser);
  });

  it('should clean up user listeners', function() {
    this.Login.componentWillUnmount();
    var store = this.Login.UserStore;
    assert.equal(store.removeSetUserListener.firstCall.args[0],
                 this.Login.onSetUser);
  });

  it('should navigate to card-listing when user signs in', function() {
    var transition = sinon.spy(this.Login, 'transitionTo');
    this.Login.UserStore.getCurrentUser = function() {
      return {
        is_logged_in: true,
      };
    };
    this.Login.onSetUser();
    assert.equal(transition.firstCall.args[0], 'card-listing');
  });

  // TODO: add a test for sign-in failures when we know what to do there.

});
