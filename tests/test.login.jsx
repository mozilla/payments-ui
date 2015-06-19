'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');

describe('Login', function() {

  var UserActions;
  var UserStore;

  beforeEach(function() {
    var stubs = helpers.getUserStubs();
    UserActions = stubs.UserActions;
    UserStore = stubs.UserStore;
  });

  function mountView() {
    var Login = rewire('views/login');
    Login.__set__({
      UserActions: UserActions,
      UserStore: UserStore,
    });

    return helpers.getRoutedComponent(Login);
  }

  it('should sign in on mount', function() {
    mountView();
    assert.ok(UserActions.signIn.called);
  });

  it('should listen to user change', function() {
    var view = mountView();
    assert.equal(UserStore.addSetUserListener.firstCall.args[0],
                 view.component.onSetUser);
  });

  it('should clean up user listeners', function() {
    var view = mountView();
    view.component.componentWillUnmount();
    assert.equal(UserStore.removeSetUserListener.firstCall.args[0],
                 view.component.onSetUser);
  });

  it('should navigate to card-listing when user signs in', function() {
    UserStore.getCurrentUser = function() {
      return {
        is_logged_in: true,
      };
    };
    var view = mountView();
    view.component.onSetUser();
    assert.equal(view.transitionSpy.firstCall.args[0], 'card-listing');
  });

  // TODO: add a test for sign-in failures when we know what to do there.

});
