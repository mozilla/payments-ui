import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';
import Modal from 'components/modal';

import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class AddPayMethod extends Component {

  static propTypes = {
    addCreditCard: PropTypes.func.isRequired,
    braintreeToken: PropTypes.string.isRequired,
    cardSubmissionErrors: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/add-pay-method');
  }

  handleCardSubmit(creditCard) {
    console.log('submitting credit card to sign up for subscription',
                this.props.productId);
    this.props.addCreditCard(this.props.braintreeToken, creditCard);
  }

  render() {
    return (
      <Modal handleClose={this.props.closeModal}
        title={gettext('Add Card')}>
        <div className="card-details">
          <CardForm
            submissionErrors={this.props.cardSubmissionErrors}
            submitPrompt={gettext('Add')}
            handleCardSubmit={(card) => this.handleCardSubmit(card)}
            id="braintree-form"
            method="post"
          />
        </div>
      </Modal>
    );
  }
}
