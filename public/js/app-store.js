'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var dispatcher = require('dispatcher');


function AppStore(localDispatcher) {
  this.error = null;
  localDispatcher.register((function(payload) {
    if (payload.actionType === 'set-app-error') {
      // Example:
      //   {debugMessage: 'detailed message but not one to show the user'}
      this.error = payload.error;
      console.error('encountered app error:', this.error);
      this.emit('set-app-error');
    }
  }).bind(this));
}


AppStore.prototype = assign({}, EventEmitter.prototype, {

  getError: function() {
    return this.error;
  },

  addErrorListener: function(handler) {
    this.on('set-app-error', handler);
  },

  removeErrorListener: function(handler) {
    this.removeListener('set-app-error', handler);
  },

});


module.exports = new AppStore(dispatcher);
