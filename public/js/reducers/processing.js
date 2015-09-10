import * as actionTypes from 'constants/action-types';

// Map of things that are currently being processed.
// Each key is a custom processing ID. When a value is `true` it means
// the action is in process.
//
// Example:
// `state['CardForm-id'] === true` would mean the CardForm is currently
// being processed.
// `!state['CardForm-id']` would mean the CardForm is not being processed.
//
export const initialProcessingState = {};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.BEGIN_PROCESSING:
      var currentlyInProcess = Object.assign({}, state);
      currentlyInProcess[action.processingId] = true;
      return currentlyInProcess;
    case actionTypes.STOP_PROCESSING:
      var currentlyInProcess = Object.assign({}, state);
      if (currentlyInProcess[action.processingId]) {
        // To prevent old entries from hanging around,
        // delete the flag entirely.
        delete currentlyInProcess[action.processingId];
      }
      return currentlyInProcess;
    default:
      return state || initialProcessingState;
  }
}
