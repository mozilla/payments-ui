import React from 'react';

import ProductDetail from 'components/product-detail';
import SubmitButton from 'components/submit-button';

import { gettext } from 'utils';
import tracking from 'tracking';


export default React.createClass({

  displayName: 'CompleteView',

  propTypes: {
    productId: React.PropTypes.string.isRequired,
    userEmail: React.PropTypes.string.isRequired,
    win: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      win: window,
    };
  },

  componentDidMount: function() {
    tracking.setPage('/complete-payment');
  },

  handleClick: function(e) {
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
  },

  render: function() {
    var component = this;
    return (
      <div className="complete">
        <ProductDetail productId={component.props.productId} />
        <p className="accepted">{gettext('Payment Accepted')}</p>
        <p className="receipt">
          {gettext('Your receipt has been sent to')}
          <span className="email">{this.props.userEmail}</span>
        </p>
        <SubmitButton text={gettext('OK')}
                      onClick={component.handleClick} />
      </div>
    );
  },
});
