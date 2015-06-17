'use strict';

var rewire = require('rewire');


describe('UserStore', function() {

  var userStore;
  var dispatch;

  function dispatchUser() {
    var user = {email: 'foo@bar.com'};
    dispatch({
      actionType: 'set-user',
      user: user,
    });
    return user;
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

  it('should respond to set-user actions', function() {
    var user = dispatchUser();
    assert.equal(userStore.getCurrentUser(), user);
  });

  it('should emit a set-user event', function() {
    dispatchUser();
    assert.equal(this.emitSpy.firstCall.args[0], 'set-user');
  });

  it('should throw an error if user has not been set', function() {
    assert.throws(userStore.getCurrentUser, Error);
  });

});
