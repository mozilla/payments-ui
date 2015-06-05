'use strict';

var React = require('react');

var SubmitButton = require('components/submit-button');
var gettext = require('utils').gettext;

module.exports = React.createClass({

  displayName: 'CompleteView',

  propTypes: {
    productName: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      productName: 'Mozilla Concrete',
    };
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
    return (
      <div className="complete">
        <h1>Payment complete!</h1>
        <span className="product">{this.props.productName}</span>
        <img className="tick" src="/img/tick.svg" />
        <SubmitButton text={gettext('OK')} onClick={this.handleClick} />
      </div>
    );
  },
});
