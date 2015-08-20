import React, { Component, PropTypes } from 'react';
import * as products from 'products';
import { gettext } from 'utils';

export default class ProductDetail extends Component {

  static propTypes = {
    // Optional product price. This only applies to products that do not have
    // a configured price, such as donations.
    price: PropTypes.string,
    productId: PropTypes.string.isRequired,
  }

  render() {

    var productData = products.get(this.props.productId);
    var recurrence = (productData.recurrence === 'monthly' ?
      <div className="recurrence">{gettext('per month')}</div> : '');
    var price;

    // TODO: localize/format prices with currency symbol.
    if (productData.price && Object.keys(productData.price).length) {
      console.log('Showing configured price for product', productData.id);
      price = productData.price.en;
    } else {
      console.log('Showing component property price for product',
                  productData.id);
      price = this.props.price;
    }

    return (
      <div className="product">
        <h1 className="title">{productData.seller.name.en}</h1>
        <div>{productData.description.en}</div>
        <div className="price">{price}</div>
        {recurrence}
      </div>
    );
  }
}
