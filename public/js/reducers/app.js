import * as actionTypes from 'constants/action-types';
import { getId } from 'utils';


export const initialAppState = {
  csrfToken: null,
  error: null,
  // Notification is a mappable array e.g:
  // [[key, notification], [key, notification], ...]
  notifications: [],
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    case actionTypes.GOT_CSRF_TOKEN:
      return Object.assign({}, state, {
        csrfToken: action.csrfToken,
      });
    case actionTypes.ADD_NOTIFICATION:
      var newNotifications = state.notifications.slice(0);
      var notificationMap = new Map(newNotifications);
      var notification = notificationMap.set(getId(), action.data);
      newNotifications = [...notificationMap];
      return Object.assign({}, state, {
        notifications: newNotifications,
      });
    case actionTypes.REMOVE_NOTIFICATION:
      var newNotifications = state.notifications.slice(0);
      var notificationMap = new Map(newNotifications);
      var notification = notificationMap.get(action.id);
      if (notification) {
        console.log('Removing', notification, 'from notifications');
        notificationMap.delete(action.id);
        newNotifications = [...notificationMap];
      } else {
        console.warn("Can't remove non-existant notification id", action.id);
      }
      return Object.assign({}, state, {
        notifications: newNotifications,
      });
    default:
      return state || initialAppState;
  }
}
