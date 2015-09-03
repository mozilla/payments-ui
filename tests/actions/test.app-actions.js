import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';


describe('appActions', function() {

  it('should dispatch error message', function() {
    var error = {debugMessage: 'something happened',
                 userMessage: undefined};
    var action = appActions.error(error.debugMessage);
    assert.deepEqual(action, {
      type: actionTypes.APP_ERROR,
      error: error,
    });
  });

  it('should dispatch user message error', function() {
    var userMessage = 'some informative message';
    var action = appActions.error(
      'some debug message', {userMessage: userMessage}
    );
    assert.equal(action.error.userMessage, userMessage);
  });

});
