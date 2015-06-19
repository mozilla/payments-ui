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
    if (payload.actionType === 'user-signed-in') {
      console.log('UserStore: storing signed in user:', payload.user);
      //
      // Example:
      // {email: 'f@f.com', payment_methods: []}
      //
      this.currentUser = payload.user;
      this.emit('user-signed-in');
    }
  }).bind(this));
}


UserStore.prototype = assign({}, EventEmitter.prototype, {

  getSignedInUser: function() {
    if (!this.currentUser) {
      throw new Error('user is not signed in');
    }
    return this.currentUser;
  },

  addSignInListener: function(handler) {
    this.on('user-signed-in', handler);
  },

  removeSignInListener: function(handler) {
    this.removeListener('user-signed-in', handler);
  },

});


module.exports = new UserStore(dispatcher);
