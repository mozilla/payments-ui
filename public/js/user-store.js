'use strict';

var dispatcher = require('dispatcher');


function UserStore(localDispatcher) {
  //
  // A read-only object that reports user state.
  // The object listens to the central dispatcher
  // for messages and alters internal state accordingly.
  // Top-level views can read store properties
  // and/or listen to change events (not yet implemented).
  //
  this.currentUser = null;
  localDispatcher.register((function(payload) {
    if (payload.actionType === 'set-user') {
      console.log('UserStore: storing current user:', payload.user);
      this.currentUser = payload.user;
    }
  }).bind(this));
}


UserStore.prototype.getCurrentUser = function() {
  if (!this.currentUser) {
    throw new Error('no user has been set');
  }
  return this.currentUser;
};


module.exports = new UserStore(dispatcher);
module.exports.Class = UserStore;
