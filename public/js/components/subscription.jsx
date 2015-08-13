import React, { Component, PropTypes } from 'react';

import PayMethodDropDown from 'components/pay-method-drop-down';
import { gettext } from 'utils';
import * as products from 'products';


export default class Subscription extends Component {

  static propTypes = {
    paymethod: PropTypes.string.isRequired,
    payMethods: PropTypes.array.isRequired,
    seller_product: PropTypes.shape({
      public_id: PropTypes.string,
    }).isRequired,
    showNav: PropTypes.bool,
    showNextPayment: PropTypes.bool,
  }

  static defaultProps = {
    showNav: true,
    showNextPayment: true,
  }

  render() {
    var productData = products.get(this.props.seller_product.public_id);

    return (
      <div className="subscription">
        <div className="product">
          <img alt="" src={productData.img} />
          <div className="meta">
            <h2 className="seller">{productData.seller.name.en}</h2>
            <p className="description">{productData.description.en}</p>
            <span className="price">
              {gettext('Monthly price')} {productData.price.en}</span>
            {this.props.showNextPayment ?
              <span className="next-payment">
                {gettext('Next payment')} PLACEHOLDER</span> : null}
          </div>
        </div>
        {this.props.showNav ?
        <div className="actions">
          <label className="vh"
            htmlFor="pm">{gettext('Change payment account')}</label>
          <PayMethodDropDown
            payMethods={this.props.payMethods}
            selectId="pm"
            selectedPayMethodResource={this.props.paymethod}
            showDefaultOption={false}
          />
          <a className="cancel" href="#">{gettext('Cancel subscription')}</a>
        </div> : null}
      </div>
    );
  }
}
