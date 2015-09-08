import * as actionTypes from 'constants/action-types';
import * as notificationActions from 'actions/notifications';


describe('notificationActions', function() {
  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function addNotification(text, notification = {}) {
      var defAction = notificationActions.addNotification(text, notification);
      defAction(dispatchSpy);
  }

  function removeNotification(id) {
      var defAction = notificationActions.removeNotification(id);
      defAction(dispatchSpy);
  }

  it('should dispatch ADD_NOTIFICATION', function() {
    var note = {type: 'info'};
    addNotification('whatever', note);
    var action = dispatchSpy.firstCall.args[0];
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
    removeNotification('awooga');
    var action = dispatchSpy.firstCall.args[0];
    assert.deepEqual(action, {
      type: actionTypes.REMOVE_NOTIFICATION,
      id: 'awooga',
    });
  });

});
