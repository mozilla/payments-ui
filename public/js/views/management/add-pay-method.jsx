import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';

import { default as tracking } from 'tracking';
import { gettext, setTitle } from 'utils';


export default class AddPayMethod extends Component {

  static propTypes = {
    addCreditCard: PropTypes.func.isRequired,
    braintreeToken: PropTypes.string.isRequired,
    cardSubmissionErrors: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setTitle(gettext('Add Payment Method'));
    tracking.setPage('/add-pay-method');
  }

  handleCardSubmit(creditCard, processingId) {
    console.log('submitting credit card as new pay method');
    this.props.addCreditCard({braintreeToken: this.props.braintreeToken,
                              creditCard: creditCard,
                              processingId: processingId});
  }

  render() {
    return (
      <div className="card-details">
        <h1>{gettext('Add Payment Method')}</h1>
        <CardForm
          submissionErrors={this.props.cardSubmissionErrors}
          submitPrompt={gettext('Add')}
          handleCardSubmit={this.handleCardSubmit.bind(this)}
          id="braintree-form"
          method="post"
        />
        <a href="#" className="back" onClick={this.props.showPayMethods}>
          {gettext('Back')}</a>
      </div>
    );
  }
}
