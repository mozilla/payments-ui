'use strict';

var rewire = require('rewire');


describe('AppStore', function() {

  var appStore;
  var dispatch;

  function dispatchError(opt) {
    opt = opt || {};
    opt.error = opt.error || {
      debugMessage: 'something happened',
    };

    dispatch({
      actionType: 'set-app-error',
      error: opt.error,
    });

    return opt.error;
  }

  beforeEach(function() {
    var module = rewire('app-store');

    var dispatcher = {
      register: function(receiver) {
        // Reference the callback so we can dispatch messages directly.
        dispatch = receiver;
      },
    };

    var AppStore = module.__get__('AppStore');
    appStore = new AppStore(dispatcher);

    // Stub out the event emitter.
    appStore.emit = function(event) {
      console.log('stub event emitted:', event);
    };

    this.emitSpy = sinon.spy(appStore, 'emit');
  });

  it('should let you get the error', function() {
    var error = dispatchError();
    assert.equal(appStore.getError(), error);
  });

  it('should emit a set-app-error event', function() {
    dispatchError();
    assert.equal(this.emitSpy.firstCall.args[0], 'set-app-error');
  });

});
