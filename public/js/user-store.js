'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('dispatcher');


function UserStore(localDispatcher) {
  //
  // A read-only object that reports user state.
  // The object listens to the central dispatcher
  // for messages and alters internal state accordingly.
  // Top-level views can read user properties
  // and/or listen to change events (not yet implemented).
  //
  this.currentUser = null;
  localDispatcher.register((function(payload) {
    if (payload.actionType === 'set-user') {
      console.log('UserStore: storing current user:', payload.user);
      //
      // Example:
      // {email: 'f@f.com', is_logged_in: true, payment_methods: []}
      //
      this.currentUser = payload.user;
      this.emit('set-user');
    }
  }).bind(this));
}


UserStore.prototype = assign({}, EventEmitter.prototype, {

  getCurrentUser: function() {
    if (!this.currentUser) {
      throw new Error('no user has been set');
    }
    return this.currentUser;
  },

  getLoggedInUser: function() {
    var user = this.getCurrentUser();
    if (!user.is_logged_in) {
      throw new Error('the current user is not logged in');
    }
    return user;
  },

  addSetUserListener: function(handler) {
    this.on('set-user', handler);
  },

  removeSetUserListener: function(handler) {
    this.removeListener('set-user', handler);
  },

});


module.exports = new UserStore(dispatcher);
