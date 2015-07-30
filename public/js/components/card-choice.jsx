import $ from 'jquery';
import React, { Component, PropTypes } from 'react';

import CardList from 'components/card-list';
import SubmitButton from 'components/submit-button';

import { gettext } from 'utils';
import * as transactionActions from 'actions/transaction';

import dataStore from 'data-store';


export default class CardChoice extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
      }
    )).isRequired,
    productId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      card: (this.props.cards.length === 1 ?
             this.props.cards[0].resource_uri : null),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({isSubmitting: true});

    $.ajax({
      data: {
        pay_method_uri: this.state.card,
        plan_id: this.props.productId,
      },
      url: '/api/braintree/subscriptions/',
      method: 'post',
      dataType: 'json',
      context: this,
    }).done(function() {
      console.log('Successfully subscribed with existing card');

      dataStore.dispatch(
        transactionActions.complete()
      );

    }).fail(function() {
      // TODO: handler errors.
    });
  }

  handleCardChange = (e) => {
    this.setState({card: e.target.value});
  }

  render() {
    var cardData = this.props.cards;
    for (var i = 0; i < cardData.length; i += 1) {
      var card = cardData[i];
      card.checked = this.state.card === card.resource_uri;
    }

    var formIsValid = this.state.card !== null;

    return (
      <form id="card-listing" onSubmit={this.handleSubmit}>
        <CardList
          cards={cardData}
          onCardChange={this.handleCardChange} />
        <SubmitButton isDisabled={!formIsValid}
          showSpinner={this.state.isSubmitting}
          text={gettext('Subscribe')}
        />
      </form>
    );
  }
}
