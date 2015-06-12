'use strict';

var UserStore = require('user-store');


describe('UserStore', function() {

  var userStore;
  var dispatch;

  beforeEach(function() {
    var dispatcher = {
      register: function(receiver) {
        // Reference the callback so we can dispatch messages directly.
        dispatch = receiver;
      },
    };
    userStore = new UserStore.Class(dispatcher);
  });

  it('should respond to set-user actions', function() {
    var user = {email: 'foo@bar.com'};
    dispatch({
      actionType: 'set-user',
      user: user,
    });
    assert.equal(userStore.getCurrentUser(), user);
  });

  it('should throw if user has not been set', function() {
    assert.throws(userStore.getCurrentUser, Error);
  });

});
