'use strict';

var classNames = require('classnames');
var React = require('react');


var CardIcon = React.createClass({
  displayName: 'CardIcon',

  propTypes: {
    cardType: React.PropTypes.oneOf([
      'american-express',
      'diners-club',
      'discover',
      'jcb',
      'maestro',
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
    var cardClassName = classNames([
      'card-icon',
      'cctype-' + (this.cardTypeMap[cardType] || cardType),
    ]);
    return cardType ? <span className={cardClassName} /> : null;
  },
});

module.exports = CardIcon;
