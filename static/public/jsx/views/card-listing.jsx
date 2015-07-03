'use strict';

var React = require('react');
var Connector = require('redux/react').Connector;

var CardChoice = require('components/card-choice');
var ProductDetail = require('components/product-detail');
var gettext = require('utils').gettext;
var purchaseActions = require('actions/purchase');


module.exports = React.createClass({

  displayName: 'CardListing',

  propTypes: {
    payWithNewCard: React.PropTypes.func.isRequired,
    paymentMethods: React.PropTypes.array.isRequired,
    productId: React.PropTypes.string.isRequired,
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
