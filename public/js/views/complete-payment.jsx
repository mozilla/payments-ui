'use strict';

var React = require('react');

var ProductDetail = require('components/product-detail');
var SubmitButton = require('components/submit-button');

var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'CompleteView',

  propTypes: {
    productId: React.PropTypes.string.isRequired,
    userEmail: React.PropTypes.string.isRequired,
  },

  handleClick: function(e) {
    e.preventDefault();
    if (window.parent !== window) {
      // Note: the targetOrigin is wide open.
      // Nothing sensitive should be sent whilst
      // that's the case.
      console.log('Telling parent to close modal.');
      // Stringifying the object is necessary for
      // IE9 support.
      window.parent.postMessage(JSON.stringify({
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
