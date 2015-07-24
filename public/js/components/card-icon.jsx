import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

// Just a convenience mapping for cards from card-validator
// to shorted classes used in CSS.
const cardTypeMap = {
  'american-express': 'amex',
  'diners-club': 'diners',
  'master-card': 'mastercard',
};

export default class CardIcon extends Component {

  static propTypes = {
    cardType: PropTypes.oneOf([
      'amex',
      'american-express',
      'diners-club',
      'discover',
      'jcb',
      'maestro',
      'mastercard',
      'master-card',
      'visa',
    ]),
  };


  render() {
    // This is only displayed if a cardType is passed-in.
    var cardType = this.props.cardType;
    var cardClassName = cx([
      'card-icon',
      'cctype-' + (cardTypeMap[cardType] || cardType),
    ]);
    return cardType ? <span className={cardClassName} /> : null;
  }
}
