import * as actionTypes from 'constants/action-types';
import * as notificationActions from 'actions/notifications';


describe('notificationActions', function() {

  function addNotification(text, notification = {}) {
      return notificationActions.addNotification(text, notification);
  }

  function removeNotification(id) {
      return notificationActions.removeNotification(id);
  }

  it('should dispatch ADD_NOTIFICATION', function() {
    var note = {type: 'info'};
    var action = addNotification('whatever', note);
    assert.deepEqual(action, {
      type: actionTypes.ADD_NOTIFICATION,
      data: {
        autoHide: true,
        text: 'whatever',
        type: 'info',
        userDismissable: false,
      },
    });
  });

  it('should dispatch user REMOVE_NOTIFICATION', function() {
    var action = removeNotification('awooga');
    console.log(action);
    assert.deepEqual(action, {
      type: actionTypes.REMOVE_NOTIFICATION,
      id: 'awooga',
    });
  });

});
