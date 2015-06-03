'use strict';

var gettext = require('utils').gettext;

module.exports = {
  'default': {
    card: {
      pattern: '1111 1111 1111 1111',
      placeholder: gettext('Card number'),
    },
    cvv: {
      pattern: '111',
      placeholder: gettext('CVV'),
    },
    expiration: {
      label: gettext('Expiry Date'),
      pattern: '11/11',
      placeholder: 'MM/YY',
    },
  },
  'american-express': {
    card: {
      pattern: '1111 111111 11111',
    },
    cvv: {
      pattern: '1111',
      placeholder: gettext('CID'),
    },
  },
  'diners-club': {
    card: {
      pattern: '1111 111111 1111',
    },
    cvv: {
      pattern: '111',
      placeholder: gettext('CVV'),
    },
  },
};
