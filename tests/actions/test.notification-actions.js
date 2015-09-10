import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as notificationActions from 'actions/notifications';

import * as helpers from '../helpers';


describe('notificationActions', function() {

  function removeNotification(id) {
      return notificationActions.removeNotification(id);
  }

  it('should dispatch ADD_NOTIFICATION', function() {
    var action = notificationActions.showError({
      errorCode: errorCodes.PRODUCT_ID_INVALID,
      text: 'whatever',
    });
    helpers.assertNotificationErrorCode(
      action, errorCodes.PRODUCT_ID_INVALID);
  });

  it('should default to autoHide for info notification', function() {
    var action = notificationActions.showInfo({text: 'whatever'});
    assert.equal(action.data.autoHide, true);
  });

  it('should default to being dismissable for error notification', function() {
    var action = notificationActions.showError({
      errorCode: errorCodes.PRODUCT_ID_INVALID,
    });
    assert.equal(action.data.userDismissable, true);
  });

  it('should throw on missing text in info notification', function() {
    assert.throws(() => {
      notificationActions.showInfo();
    }, Error, /requires text/);
  });

  it('should throw on missing errorCode in error', function() {
    assert.throws(() => {
      notificationActions.showError();
    }, Error, /requires an errorCode/);
  });

  it('sets default error message', function() {
    var action = notificationActions.showError({
      errorCode: errorCodes.PRODUCT_ID_INVALID,
    });
    assert.include(action.data.text, 'Internal error');
  });

  it('should dispatch user REMOVE_NOTIFICATION', function() {
    var action = removeNotification('awooga');
    assert.deepEqual(action, {
      id: 'awooga',
      type: actionTypes.REMOVE_NOTIFICATION,
    });
  });

});
