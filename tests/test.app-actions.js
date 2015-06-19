'use strict';

var rewire = require('rewire');


describe('AppActions', function() {

  var dispatcher;
  var appActions;

  beforeEach(function() {

    dispatcher = {
      dispatch: sinon.spy(),
    };

    appActions = rewire('app-actions');
    appActions.__set__({
      dispatcher: dispatcher,
    });

  });

  it('should dispatch error message', function() {
    var error = {debugMessage: 'something happened'};
    appActions.setError(error.debugMessage);
    assert.deepEqual(dispatcher.dispatch.args[0][0], {
      actionType: 'set-app-error',
      error: error,
    });
  });

});
