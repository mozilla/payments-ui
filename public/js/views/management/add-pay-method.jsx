import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';

import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class AddPayMethod extends Component {

  static propTypes = {
    addCreditCard: PropTypes.func.isRequired,
    addPayMethod: PropTypes.func.isRequired,
    braintreeToken: PropTypes.string.isRequired,
    cardSubmissionErrors: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/add-pay-method');
  }

  handleCardSubmit(creditCard) {
    console.log('submitting credit card as new pay method');
    this.props.addCreditCard(this.props.braintreeToken, creditCard);
  }

  render() {
    return (
      <div className="card-details">
        <h1>{gettext('Add Card')}</h1>
        <CardForm
          submissionErrors={this.props.cardSubmissionErrors}
          submitPrompt={gettext('Add')}
          handleCardSubmit={(card) => this.handleCardSubmit(card)}
          id="braintree-form"
          method="post"
        />
        <a href="#" className="back" onClick={this.props.showPayMethods}>
          {gettext('Back')}</a>
      </div>
    );
  }
}
