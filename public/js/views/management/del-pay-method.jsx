import React, { Component, PropTypes } from 'react';

import PayMethodChoice from 'components/pay-method-choice';

import { default as tracking } from 'tracking';
import { gettext, setTitle } from 'utils';


export default class DelPayMethod extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    showConfirmDelPayMethod: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setTitle(gettext('Delete Payment Method'));
    tracking.setPage('/del-pay-method');
  }

  handleSubmit = (payMethod) => {
    this.props.showConfirmDelPayMethod(payMethod);
  }

  render() {
    return (
      <div>
        <h1>{gettext('Delete Payment Method')}</h1>
        <p>{gettext('Choose a payment method to delete. ' +
                    "You'll confirm on the next step.")}</p>
        <div className="small-form">
          <PayMethodChoice
            payMethods={this.props.payMethods}
            submitButtonText={gettext('Continue')}
            submitHandler={this.handleSubmit}
          />
        </div>
        <a href="#" className="back" onClick={this.props.showPayMethods}>
          {gettext('Back')}</a>
      </div>
    );
  }
}
