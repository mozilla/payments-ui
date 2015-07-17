'use strict';

var actionTypes = require('constants/action-types');


// TODO: expand these actions to encapsulate the Ajax
// logic more directly. This will allow the Ajax requests to
// be tested more easily. CardForm and CardChoice will need
// to be refactored.

exports.complete = function() {
  return {
    type: actionTypes.COMPLETE_PURCHASE,
  };
};


exports.payWithNewCard = function() {
  return {
    type: actionTypes.PAY_WITH_NEW_CARD,
  };
};
