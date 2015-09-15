import React, { Component, PropTypes } from 'react';
import PayMethodItem from 'components/pay-method-item';

import cx from 'classnames';


export default class PayMethodList extends Component {

  static propTypes = {
    cssModifier: PropTypes.string,
    onPayMethodChange: PropTypes.func.isRequired,
    payMethods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
      })
    ).isRequired,
  }

  render() {
    var payMethods = this.props.payMethods;
    var payMethodList = [];
    for (var i = 0; i < payMethods.length; i += 1) {
      var { checked, ...payMethod } = payMethods[i];
      payMethodList.push((
        <li>
          <PayMethodItem
            checked={checked}
            key={'ci-' + i}
            onChangeHandler={this.props.onPayMethodChange}
            payMethod={payMethod}
          />
        </li>
      ));
    }

    var classes = cx('pay-method-list', this.props.cssModifier);

    return (
      <ul className={classes}>
        {payMethodList}
      </ul>
    );
  }
}
