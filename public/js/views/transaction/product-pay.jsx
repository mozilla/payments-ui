import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';
import ProductDetail from 'components/product-detail';

import * as products from 'products';
import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class ProductPay extends Component {

  static propTypes = {
    // Amount to pay, which only applies to things like donations.
    braintreeToken: PropTypes.string.isRequired,
    cardSubmissionErrors: PropTypes.object,
    processPayment: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    userDefinedAmount: PropTypes.string,
  }

  componentDidMount() {
    tracking.setPage('/product-pay');
  }

  handleCardSubmit(creditCard, {email} = {}) {
    console.log('submitting credit card to sign up for subscription',
                this.props.productId);
    var data = {
      productId: this.props.productId,
      creditCard: creditCard,
      braintreeToken: this.props.braintreeToken,
      userDefinedAmount: this.props.userDefinedAmount,
    };
    if (email) {
      console.log('Card submission included an email address');
      data.email = email;
    }
    this.props.processPayment(data);
  }

  render() {
    var product = products.get(this.props.productId);
    var submitPrompt;
    if (product.seller.kind === 'donations') {
      submitPrompt = gettext('Donate now');
      var emailFieldRequired = product.user_identification === 'email';
    } else {
      // TODO: also handle non-recurring, non-donations here.
      submitPrompt = gettext('Subscribe');
    }

    return (
      <div className="card-details">
        <ProductDetail
          productId={this.props.productId}
          userDefinedAmount={this.props.userDefinedAmount}
        />
        <CardForm
          emailFieldRequired={emailFieldRequired}
          handleCardSubmit={(card) => this.handleCardSubmit(card)}
          id="braintree-form"
          method="post"
          submissionErrors={this.props.cardSubmissionErrors}
          submitPrompt={submitPrompt}
        />
      </div>
    );
  }
}
