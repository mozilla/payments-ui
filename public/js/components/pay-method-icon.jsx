import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

// Just a convenience mapping for payMethods from payMethod-validator
// to shorted classes used in CSS.
const payMethodTypeMap = {
  'american-express': 'amex',
  'diners-club': 'diners',
  'master-card': 'mastercard',
};

export default class PayMethodIcon extends Component {

  static propTypes = {
    payMethodType: PropTypes.oneOf([
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
  }

  render() {
    // This is only displayed if a payMethodType is passed-in.
    var payMethodType = this.props.payMethodType;
    var payMethodClassName = cx([
      'pay-method-icon',
      'pmtype-' + (payMethodTypeMap[payMethodType] || payMethodType),
    ]);
    return payMethodType ? <span className={payMethodClassName}></span> : null;
  }
}
