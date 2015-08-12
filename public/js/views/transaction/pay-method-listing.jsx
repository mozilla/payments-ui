import React, { Component, PropTypes } from 'react';

import PayMethodChoice from 'components/pay-method-choice';
import ProductDetail from 'components/product-detail';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class PayMethodListing extends Component {

  static propTypes = {
    createSubscription: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    payWithNewCard: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/pay-method-listing');
  }

  handleSubmit = (payMethod) => {
    this.props.createSubscription(this.props.productId, payMethod);
  }

  render() {
    return (
      <div>
        <ProductDetail productId={this.props.productId} />
        <PayMethodChoice
          payMethods={this.props.payMethods}
          productId={this.props.productId}
          submitButtonText={gettext('Subscribe')}
          submitHandler={this.handleSubmit}
        />
        <a className="add-card" href="#"
          onClick={this.props.payWithNewCard}>
          {gettext('Add new credit card')}
        </a>
      </div>
    );
  }
}
