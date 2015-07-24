import React, { Component, PropTypes } from 'react';
import products from 'products';
import { gettext } from 'utils';

export default class ProductDetail extends Component {

  static propTypes = {
    productId: PropTypes.string.isRequired,
  }

  render() {

    var productId = this.props.productId;
    var productData = products[productId];

    if (!productData) {
      throw new Error('Invalid product: ' + productId);
    }

    return (
      <div className="product">
        <h1 className="title">{productData.seller.name.en}</h1>
        <div>{productData.description.en}</div>
        <div className="price">{productData.price.en}</div>
        <div>{gettext('per month')}</div>
      </div>
    );
  }
}
