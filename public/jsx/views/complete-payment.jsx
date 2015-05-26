'use strict';

var React = require('react');

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

  render: function() {
    return (
      <div className="complete">
        <h1>Payment complete!</h1>
        <span className="product">{this.props.productName}</span>
        <img className="tick" src="/img/tick.svg" />
      </div>
    );
  },
});
