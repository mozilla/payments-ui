import React, { Component, PropTypes } from 'react';

import CardChoice from 'components/card-choice';
import ProductDetail from 'components/product-detail';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class CardListing extends Component {

  static propTypes = {
    payWithNewCard: PropTypes.func.isRequired,
    paymentMethods: PropTypes.array.isRequired,
    productId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    tracking.setPage('/card-listing');
  }

  render() {
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
  }
}
