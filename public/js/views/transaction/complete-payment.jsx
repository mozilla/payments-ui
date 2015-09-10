import React, { Component } from 'react';

import ProductDetail from 'components/product-detail';
import SubmitButton from 'components/submit-button';

import * as products from 'products';
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
    var _parent = win.parent;

    // TODO: wrap this so dead code elimination removes it.
    // The try/catch is just to make the OK button work when served by
    // webpack-dev-server.
    try {
      if (_parent.location.hostname === 'pay.webpack') {
        console.log(
          'Setting _parent to the parent of the webpack-dev-server iframe');
        _parent = _parent.parent;
      }
    } catch (exc) {
      console.log('Cannot introspect the location object of parent',
                  exc.message);
    }

    if (_parent !== window) {
      // Note: the targetOrigin is wide open.
      // Nothing sensitive should be sent whilst
      // that's the case.
      console.log('Telling parent to close modal.');
      // Stringifying the object is necessary for
      // IE9 support.
      _parent.postMessage(JSON.stringify({
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

    var product = products.get(this.props.productId);
    var completionMsg = (product.seller.kind === 'donations' ?
                         gettext('Donation Sent') :
                         gettext('Payment Accepted'));

    return (
      <div className="complete">
        <ProductDetail
          productId={this.props.productId}
          userDefinedAmount={this.props.userDefinedAmount}
        />
        <p className="accepted">{completionMsg}</p>
        {email}
        <SubmitButton content={gettext('OK')}
                      onClick={this.handleClick} />
      </div>
    );
  }
}
