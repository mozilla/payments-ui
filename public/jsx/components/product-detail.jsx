'use strict';

var React = require('react');
var products = require('products');
var gettext = require('utils').gettext;

module.exports = React.createClass({

  displayName: 'ProductDetail',

  propTypes: {
    productId: React.PropTypes.string.isRequired,
  },

  render: function() {

    var productId = this.props.productId;
    var productData = products[productId];

    if (!productData) {
      throw new Error('Invalid product: ' + productId);
    }

    // TODO: this should use string formatting for
    // l10n. Also let's add a localized currency symbol.
    return (
      <div className="product">
        <h1 className="title">{productData.id}</h1>
        <span className="price">
          {productData.amount + ' ' +
           productData.currency + ' ' +
           gettext('per month')}</span>
      </div>
    );
  },
});
