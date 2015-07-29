import * as appActions from 'actions/app';
import * as reducers from 'reducers';


describe('App Reducer', function() {

  function appWithError() {
    return {
      error: {
        debugMessage: 'some informative message',
      },
    };
  }

  it('should initialize an app', function() {
    var app = reducers.app(undefined, {});
    assert.deepEqual(app, {});
  });

  it('should set an app error', function() {
    var dispatchedApp = appWithError();

    var app = reducers.app(
      {}, appActions.error(dispatchedApp.error.debugMessage));

    assert.deepEqual(app, dispatchedApp);
  });

  it('should preserve app state', function() {
    var dispatchedApp = appWithError();
    var state = {};

    // Receive an error action:
    state.app = reducers.app(
      state, appActions.error(dispatchedApp.error.debugMessage));
    // Receive and ignore some other action:
    state.app = reducers.app(state.app, {});

    assert.deepEqual(state.app, dispatchedApp);
  });

});
