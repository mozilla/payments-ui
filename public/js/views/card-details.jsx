import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';
import ProductDetail from 'components/product-detail';

import { default as tracking } from 'tracking';


export default class CardDetails extends Component {

  static propTypes = {
    braintreeToken: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/card-details');
  }

  render() {
    return (
      <div className="card-details">
        <ProductDetail productId={this.props.productId} />
        <CardForm
          braintreeToken={this.props.braintreeToken}
          id="braintree-form"
          method="post"
          productId={this.props.productId}
        />
      </div>
    );
  }
}
