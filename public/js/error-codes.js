'use strict';

var gettext = require('utils').gettext;

module.exports = {
  cvv: {
    field: 'cvv',
    message: gettext('Invalid CVV'),
  },
  default: {
    message: gettext('Card declined'),
  },
};
