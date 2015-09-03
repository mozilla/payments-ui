import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import appReducer from 'reducers/app';
import { initialAppState } from 'reducers/app';


describe('App Reducer', function() {

  function appWithError() {
    return {
      error: {
        debugMessage: 'some informative message',
      },
    };
  }

  it('should initialize an app', function() {
    var app = appReducer(undefined, {});
    assert.deepEqual(app, initialAppState);
  });

  it('should set an app error', function() {
    var dispatchedApp = appWithError();

    var app = appReducer(
      {}, appActions.error(dispatchedApp.error.debugMessage));

    assert.deepEqual(app, dispatchedApp);
  });

  it('should preserve app state', function() {
    var dispatchedApp = appWithError();
    var state = {};

    // Receive an error action:
    state.app = appReducer(
      state, appActions.error(dispatchedApp.error.debugMessage));
    // Receive and ignore some other action:
    state.app = appReducer(state.app, {});

    assert.deepEqual(state.app, dispatchedApp);
  });

  it('should store CSRF token', function() {
    var app = appReducer({}, {
      type: actionTypes.GOT_CSRF_TOKEN,
      csrfToken: 'some-csrf-token',
    });
    assert.deepEqual(app, Object.assign({}, initialAppState, {
      csrfToken: 'some-csrf-token',
    }));
  });

});
