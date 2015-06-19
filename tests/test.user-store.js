'use strict';

var rewire = require('rewire');


describe('UserStore', function() {

  var userStore;
  var dispatch;

  function dispatchUser(opt) {
    opt = opt || {};
    opt.user = opt.user || {
      email: 'foo@bar.com',
      payment_methods: [],
    };

    dispatch({
      actionType: 'user-signed-in',
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

  it('should let you get the signed in user', function() {
    var user = dispatchUser();
    assert.equal(userStore.getSignedInUser(), user);
  });

  it('should emit a user-signed-in event', function() {
    dispatchUser();
    assert.equal(this.emitSpy.firstCall.args[0], 'user-signed-in');
  });

  it('should throw an error if user is not signed in', function() {
    assert.throws(userStore.getSignedInUser, Error);
  });

});
