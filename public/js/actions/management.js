import * as actionTypes from 'constants/action-types';


export function error(debugMessage) {
  return {
    type: actionTypes.APP_ERROR,
    error: {debugMessage: debugMessage},
  };
}

export function showPayMethods() {
  return {
    type: actionTypes.SHOW_PAY_METHODS,
  };
}

export function showAddPayMethod() {
  return {
    type: actionTypes.SHOW_ADD_PAY_METHOD,
  };
}

export function showDelPayMethod() {
  return {
    type: actionTypes.SHOW_DEL_PAY_METHOD,
  };
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL,
  };
}
