import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';
import ProductDetail from 'components/product-detail';
import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class AddSubscription extends Component {

  static propTypes = {
    braintreeToken: PropTypes.string.isRequired,
    cardSubmissionErrors: PropTypes.object,
    createSubscription: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/add-subscription');
  }

  handleCardSubmit(creditCard) {
    console.log('submitting credit card to sign up for subscription',
                this.props.productId);
    this.props.createSubscription(this.props.braintreeToken,
                                  this.props.productId,
                                  creditCard);
  }

  render() {
    return (
      <div className="card-details">
        <ProductDetail productId={this.props.productId} />
        <CardForm
          submissionErrors={this.props.cardSubmissionErrors}
          submitPrompt={gettext('Subscribe')}
          handleCardSubmit={(card) => this.handleCardSubmit(card)}
          id="braintree-form"
          method="post"
        />
      </div>
    );
  }
}
