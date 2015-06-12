'use strict';

var UserActions = require('user-actions');


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

  it('should dispatch current user', function() {
    var user = {email: 'foo@bar.com'};
    userActions.setCurrentUser(user);
    assert.deepEqual(dispatcher.dispatch.args[0][0], {
      actionType: 'set-user',
      user: user,
    });
  });

});
