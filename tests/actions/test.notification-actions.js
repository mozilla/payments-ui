import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as notificationActions from 'actions/notifications';

import * as helpers from '../helpers';


describe('notificationActions', function() {

  function addNotification(text, notification = {}) {
      return notificationActions.addNotification(text, notification);
  }

  function removeNotification(id) {
      return notificationActions.removeNotification(id);
  }

  it('should dispatch ADD_NOTIFICATION', function() {
    var notification = {
      type: 'error',
      text: 'whatever',
      errorCode: errorCodes.PRODUCT_ID_INVALID,
    };
    var action = addNotification(notification);
    helpers.assertNotificationErrorCode(
      action, errorCodes.PRODUCT_ID_INVALID);
  });

  it('should default to autoHide for info notification', function() {
    var notification = {
      type: 'info',
      text: 'whatever',
    };
    var action = addNotification(notification);
    assert.equal(action.data.autoHide, true);
  });

  it('should default to being dismissable for error notification', function() {
    var notification = {
      type: 'error',
      text: 'whatever',
      errorCode: errorCodes.PRODUCT_ID_INVALID,
    };
    var action = addNotification(notification);
    assert.equal(action.data.userDismissable, true);
  });

  it('should throw on missing text in info notification', function() {
    assert.throws(() => {
      var notification = {
        type: 'info',
      };
      addNotification(notification);
    }, Error, /requires text/);
  });

  it('should throw on missing errorCode in error', function() {
    assert.throws(() => {
      var notification = {
        type: 'error',
      };
      addNotification(notification);
    }, Error, /requires an errorCode/);
  });

  it('sets default error message', function() {
    var notification = {
      type: 'error',
      errorCode: errorCodes.PRODUCT_ID_INVALID,
    };
    var action = addNotification(notification);
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
