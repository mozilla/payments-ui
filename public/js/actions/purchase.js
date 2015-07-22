'use strict';

import * as actionTypes from 'constants/action-types';

// TODO: expand these actions to encapsulate the Ajax
// logic more directly. This will allow the Ajax requests to
// be tested more easily. CardForm and CardChoice will need
// to be refactored.

export function complete() {
  return {
    type: actionTypes.COMPLETE_PURCHASE,
  };
}

export function payWithNewCard() {
  return {
    type: actionTypes.PAY_WITH_NEW_CARD,
  };
}
