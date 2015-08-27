import React, { Component } from 'react';

import ProductDetail from 'components/product-detail';
import SubmitButton from 'components/submit-button';

import { gettext } from 'utils';
import { default as tracking } from 'tracking';


export default class CompletePayment extends Component {

  static propTypes = {
    productId: React.PropTypes.string.isRequired,
    userDefinedAmount: React.PropTypes.string,
    userEmail: React.PropTypes.string.isRequired,
    win: React.PropTypes.object,
  }

  static defaultProps = {
    win: window,
  }

  componentDidMount() {
    tracking.setPage('/complete-payment');
  }

  handleClick = (e) => {
    e.preventDefault();
    var win = this.props.win;
    if (win.parent !== window) {
      // Note: the targetOrigin is wide open.
      // Nothing sensitive should be sent whilst
      // that's the case.
      console.log('Telling parent to close modal.');
      // Stringifying the object is necessary for
      // IE9 support.
      win.parent.postMessage(JSON.stringify({
        event: 'purchase-completed',
      }), '*');
    } else {
      console.log('Not iframed. No-op');
    }
  }

  render() {
    var email = (this.props.userEmail ?
      <p className="receipt">
        {gettext('Your receipt has been sent to')}
        <span className="email">{this.props.userEmail}</span>
      </p> : '');

    return (
      <div className="complete">
        <ProductDetail
          productId={this.props.productId}
          userDefinedAmount={this.props.userDefinedAmount}
        />
        <p className="accepted">{gettext('Payment Accepted')}</p>
        {email}
        <SubmitButton content={gettext('OK')}
                      onClick={this.handleClick} />
      </div>
    );
  }
}
