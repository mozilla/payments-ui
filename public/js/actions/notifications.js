import * as actionTypes from 'constants/action-types';


export function addNotification(text, { type='info', userDismissable=false,
                                autoHide=true } = {}) {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    data: { autoHide, text, type, userDismissable },
  };
}

/*
 * The expectation is that this is called by the notificationList
 * automatically (after a timeout) or on a user click. It shouldn't
 * be necessary to call this directly.
 */
export function removeNotification(id, {delay} = {}) {
  var data = {
    type: actionTypes.REMOVE_NOTIFICATION,
    id: id,
  };
  if (delay) {
    // Uses timeoutScheduler middleware.
    data.meta = {delay: delay};
  }
  return data;
}

