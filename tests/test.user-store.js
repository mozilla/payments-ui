'use strict';

var rewire = require('rewire');


describe('UserStore', function() {

  var userStore;
  var dispatch;

  function dispatchUser(opt) {
    opt = opt || {};
    opt.user = opt.user || {
      email: 'foo@bar.com',
      is_logged_in: true,
      payment_methods: [],
    };

    dispatch({
      actionType: 'set-user',
      user: opt.user,
    });

    return opt.user;
  }

  beforeEach(function() {
    var module = rewire('user-store');

    var dispatcher = {
      register: function(receiver) {
        // Reference the callback so we can dispatch messages directly.
        dispatch = receiver;
      },
    };

    var UserStore = module.__get__('UserStore');
    userStore = new UserStore(dispatcher);

    // Stub out the event emitter.
    userStore.emit = function(event) {
      console.log('stub event emitted:', event);
    };

    this.emitSpy = sinon.spy(userStore, 'emit');
  });

  it('should let you get the current user', function() {
    var user = dispatchUser();
    assert.equal(userStore.getCurrentUser(), user);
  });

  it('should let you get the logged in user', function() {
    var user = dispatchUser();
    assert.equal(userStore.getLoggedInUser(), user);
  });

  it('should emit a set-user event', function() {
    dispatchUser();
    assert.equal(this.emitSpy.firstCall.args[0], 'set-user');
  });

  it('should throw an error if user has not been set', function() {
    assert.throws(userStore.getCurrentUser, Error);
  });

  it('should throw an error if user is not logged in', function() {
    dispatchUser({user: {is_logged_in: false}});
    assert.throws(userStore.getLoggedInUser, Error);
  });

});
