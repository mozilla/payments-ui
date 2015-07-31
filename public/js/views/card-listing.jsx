import React, { Component, PropTypes } from 'react';

import CardChoice from 'components/card-choice';
import ProductDetail from 'components/product-detail';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class CardListing extends Component {

  static propTypes = {
    createSubscription: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    payWithNewCard: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/card-listing');
  }

  handleSubmit = (e, card) => {
    this.props.createSubscription(this.props.productId, card);
  }

  render() {
    return (
      <div>
        <ProductDetail productId={this.props.productId} />
        <CardChoice
          cards={this.props.payMethods}
          productId={this.props.productId}
          submitButtonText={gettext('Subscribe')}
          submitHandler={this.handleSubmit}
        />
        <a className="card-add bottom-link" href="#"
          onClick={this.props.payWithNewCard}>
          {gettext('Add new credit card')}
        </a>
      </div>
    );
  }
}
