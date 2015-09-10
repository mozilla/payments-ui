import * as actionTypes from 'constants/action-types';
import appReducer from 'reducers/app';
import { initialAppState } from 'reducers/app';


describe('App Reducer', function() {

  it('should store CSRF token', function() {
    var app = appReducer(initialAppState, {
      type: actionTypes.GOT_CSRF_TOKEN,
      csrfToken: 'some-csrf-token',
    });
    assert.deepEqual(app, Object.assign({}, initialAppState, {
      csrfToken: 'some-csrf-token',
    }));
  });

  it('should add a notification', function() {
    var app = appReducer(initialAppState, {
      type: actionTypes.ADD_NOTIFICATION,
      data: {text: 'foo', type: 'info'},
    });
    assert.equal(app.notifications.length, 1);
    assert.equal(app.notifications[0].length, 2);
    assert.deepEqual(app.notifications[0][1],
                     {text: 'foo', type: 'info'});
  });

  it('should remove a notification', function() {
    var app = appReducer(initialAppState, {
      type: actionTypes.ADD_NOTIFICATION,
      data: {text: 'foo', type: 'info'},
    });
    var id = app.notifications[0][0];
    assert.equal(app.notifications.length, 1);
    var app2 = appReducer(app, {
      type: actionTypes.REMOVE_NOTIFICATION,
      id: id,
    });
    assert.equal(app2.notifications.length, 0);
  });

  it('should not blow up removing a non-existant notification', function() {
    assert.doesNotThrow(() => {
      appReducer(initialAppState, {
        type: actionTypes.REMOVE_NOTIFICATION,
        id: 'blah',
      });
    });
  });

});
