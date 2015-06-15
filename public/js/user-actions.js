'use strict';

var dispatcher = require('dispatcher');


function UserActions(localDispatcher) {
  //
  // A helper object to perform user-related actions.
  // Each action will dispatch messages so that stores can
  // update their state accordingly.
  //
  this.dispatcher = localDispatcher;
}


UserActions.prototype.setCurrentUser = function(user) {
  console.log('UserActions: setting current user', user);
  this.dispatcher.dispatch({
    actionType: 'set-user',
    user: user,
  });
};


module.exports = new UserActions(dispatcher);
module.exports.Class = UserActions;
