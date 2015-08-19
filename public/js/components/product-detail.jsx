import React, { Component, PropTypes } from 'react';
import * as products from 'products';
import { gettext } from 'utils';

export default class ProductDetail extends Component {

  static propTypes = {
    productId: PropTypes.string.isRequired,
  }

  render() {

    var productData = products.get(this.props.productId);
    var recurrence = (productData.recurrence === 'monthly' ?
      <div className="recurrence">{gettext('per month')}</div> : '');

    return (
      <div className="product">
        <h1 className="title">{productData.seller.name.en}</h1>
        <div>{productData.description.en}</div>
        <div className="price">{productData.price.en}</div>
        {recurrence}
      </div>
    );
  }
}
