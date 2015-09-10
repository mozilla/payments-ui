import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';

import { gettext } from 'utils';


export function _addNotification({ text, errorCode,
                                   type='info', userDismissable,
                                   autoHide } = {}) {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    data: { autoHide, text, type, userDismissable, errorCode },
  };
}

export function showInfo({text, ...opts} = {}) {
  opts.type = 'info';

  if (!text) {
    throw new Error('An info notification requires text');
  } else {
    opts.text = text;
  }

  // Default info type to being hidden on delay.
  if (typeof opts.autoHide === 'undefined') {
    opts.autoHide = true;
  }

  return _addNotification({...opts});
}

export function showError({text, ...opts} = {}) {
  opts.type = 'error';

  if (!opts.errorCode || typeof errorCodes[opts.errorCode] === 'undefined') {
    throw new Error('An error notification requires an errorCode ' +
                    'defined in constants/error-codes');
  }

  if (!text) {
    opts.text = gettext('Internal error. Please try again later.');
  } else {
    opts.text = text;
  }

  // Default to error notification being userDismissable.
  if (typeof opts.userDismissable === 'undefined') {
    opts.userDismissable = true;
  }

  return _addNotification({...opts});
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

