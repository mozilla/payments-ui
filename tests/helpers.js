'use strict';

module.exports = {
  testCards: {
    amex: '378282246310005',
    discover: '6011111111111117',
    jcb: '3530111333300000',
    maestro: '6304000000000000',
    mastercard: '5555555555554444',
    visa: '4111111111111111',
    invalidVisa: '4111111111111113',
  },

  declinedError: {
    error_response: {
      braintree: {
        '__all__': [
          {'message': 'Do Not Honor', 'code': '2000'},
        ],
      },
    },
  },

  cvvError: {
    error_response: {
      braintree: {
        'cvv': [
          {'message': 'Gateway Rejected: cvv', 'code': 'cvv'},
        ],
      },
    },
  },
};
