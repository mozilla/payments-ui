import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';


describe('appActions', function() {

  it('should dispatch error message', function() {
    var error = {debugMessage: 'something happened'};
    var action = appActions.error(error.debugMessage);
    assert.deepEqual(action, {
      type: actionTypes.APP_ERROR,
      error: error,
    });
  });

});
