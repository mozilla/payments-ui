'use strict';

var cx = require('classnames');
var React = require('react');


module.exports = React.createClass({
  displayName: 'CardIcon',

  propTypes: {
    cardType: React.PropTypes.oneOf([
      'american-express',
      'diners-club',
      'discover',
      'jcb',
      'maestro',
      'mastercard',
      'master-card',
      'visa',
    ]),
  },

  // Just a convenience mapping for cards from card-validator
  // to shorted classes used in CSS.
  cardTypeMap: {
    'american-express': 'amex',
    'diners-club': 'diners',
    'master-card': 'mastercard',
  },

  render: function() {
    // This is only displayed if a cardType is passed-in.
    var cardType = this.props.cardType;
    var cardClassName = cx([
      'card-icon',
      'cctype-' + (this.cardTypeMap[cardType] || cardType),
    ]);
    return cardType ? <span className={cardClassName} /> : null;
  },
});
