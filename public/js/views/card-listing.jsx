'use strict';

var React = require('react');

var CardChoice = require('components/card-choice');
var ProductDetail = require('components/product-detail');

var gettext = require('utils').gettext;
var tracking = require('tracking');


module.exports = React.createClass({

  displayName: 'CardListing',

  propTypes: {
    payWithNewCard: React.PropTypes.func.isRequired,
    paymentMethods: React.PropTypes.array.isRequired,
    productId: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    tracking.setPage('/payment/card-list');
  },

  render: function() {
    return (
      <div className="card-listing">
        <ProductDetail productId={this.props.productId} />
        <CardChoice
          cards={this.props.paymentMethods}
          productId={this.props.productId}
        />
        <a className="card-add bottom-link" href="#"
           onClick={this.props.payWithNewCard}>
          {gettext('Add new credit card')}
        </a>
      </div>
    );
  },
});
