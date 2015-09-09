import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';

import { gettext } from 'utils';


export function addNotification({ text, errorCode,
                                  type='info', userDismissable,
                                  autoHide } = {}) {

  if (type === 'error' && !text) {
    text = gettext('Internal error. Please try again later.');
  }

  if (type === 'info' && !text) {
    throw new Error('An info notification requires text');
  }

  // Default to error type being userDismissable.
  if (type === 'error' && typeof userDismissable === 'undefined') {
    userDismissable = true;
  }

  // Default info type to being hidden on delay.
  if (type === 'info' && typeof autoHide === 'undefined') {
    autoHide = true;
  }

  if (type === 'error' && (!errorCode ||
                           typeof errorCodes[errorCode] === 'undefined')) {
    console.error('errorCode', errorCode);
    throw new Error('An error notification requires an errorCode ' +
                    'defined in constants/error-codes');
  }

  console.log('autoHide', autoHide);
  console.log('userDismissable', userDismissable);
  return {
    type: actionTypes.ADD_NOTIFICATION,
    data: { autoHide, text, type, userDismissable, errorCode },
  };
}

export function showInfo({text, ...opts} = {}) {
  opts.type = 'info';
  opts.text = text;
  return addNotification({...opts});
}

export function showError({text, ...opts} = {}) {
  opts.type = 'error';
  opts.text = text;
  return addNotification({...opts});
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

