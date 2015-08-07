import React, { Component, PropTypes } from 'react';

import { gettext } from 'utils';
import * as products from 'products';


export default class Subscription extends Component {

  static propTypes = {
    seller_product: PropTypes.shape({
      public_id: PropTypes.string,
    }).isRequired,
  }

  render() {
    var productData = products.get(this.props.seller_product.public_id);

    return (
      <div>
        <div className="product">
          <img alt="" src={productData.img}/>
          <h2 className="seller">{productData.seller.name.en}</h2>
          <p className="description">{productData.description.en}</p>
        </div>
        <div className="price">
          <div>{productData.price.en}</div>
          <div>per {gettext('month')}</div>
        </div>
        <nav>
          <div className="change-pay-account">
            <a href="#">{gettext('Change payment account')}</a>
          </div>
          <div className="cancel">
            <a href="#">{gettext('Cancel subscription')}</a>
          </div>
        </nav>
      </div>
    );
  }
}
