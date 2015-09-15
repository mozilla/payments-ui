import * as actionTypes from 'constants/action-types';


export function beginProcessing(processingId) {
  return processingAction(processingId, actionTypes.BEGIN_PROCESSING);
}


export function stopProcessing(processingId) {
  return processingAction(processingId, actionTypes.STOP_PROCESSING);
}


function processingAction(processingId, actionType) {
  if (!processingId) {
    throw new Error('processingId cannot be empty');
  }
  return {
    type: actionType,
    processingId: processingId,
  };
}
