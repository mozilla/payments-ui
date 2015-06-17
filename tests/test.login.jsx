'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');

describe('Login', function() {

  beforeEach(function() {
    var stubs = helpers.getUserStubs();
    this.UserActions = stubs.UserActions;
    this.UserStore = stubs.UserStore;

    var Login = rewire('views/login');
    Login.__set__({
      UserActions: this.UserActions,
      UserStore: this.UserStore,
    });

    var routed = helpers.getRoutedComponent(Login);
    this.Login = routed.component;
  });

  it('should sign in on mount', function() {
    this.Login.componentDidMount();
    assert.ok(this.UserActions.signIn.called);
  });

  it('should listen to user change', function() {
    this.Login.componentDidMount();
    var store = this.UserStore;
    assert.equal(store.addSetUserListener.firstCall.args[0],
                 this.Login.onSetUser);
  });

  it('should clean up user listeners', function() {
    this.Login.componentWillUnmount();
    assert.equal(this.UserStore.removeSetUserListener.firstCall.args[0],
                 this.Login.onSetUser);
  });

  it('should navigate to card-listing when user signs in', function() {
    var transition = sinon.spy(this.Login, 'transitionTo');
    this.UserStore.getCurrentUser = function() {
      return {
        is_logged_in: true,
      };
    };
    this.Login.onSetUser();
    assert.equal(transition.firstCall.args[0], 'card-listing');
  });

  // TODO: add a test for sign-in failures when we know what to do there.

});
