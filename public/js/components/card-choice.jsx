'use strict';

var $ = require('jquery');
var React = require('react');

var CardList = require('components/card-list');
var SubmitButton = require('components/submit-button');

var gettext = require('utils').gettext;
var purchaseActions = require('actions/purchase');
var reduxConfig = require('redux-config');


module.exports = React.createClass({
  displayName: 'CardChoice',

  propTypes: {
    cards: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        resource_uri: React.PropTypes.string,
        truncated_id: React.PropTypes.string,
        type_name: React.PropTypes.string,
      }
    )).isRequired,
    productId: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      isSubmitting: false,
      card: (this.props.cards.length === 1 ?
             this.props.cards[0].resource_uri : null),
    };
  },

  handleSubmit: function(e) {
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

      reduxConfig.default.dispatch(
        purchaseActions.complete()
      );

    }).fail(function() {
      // TODO: handler errors.
    });
  },

  handleCardChange: function(e) {
    this.setState({card: e.target.value});
  },

  render: function() {
    var cardData = this.props.cards;
    for (var i = 0; i < cardData.length; i += 1) {
      var card = cardData[i];
      card.checked = this.state.card === card.resource_uri;
    }

    var formIsValid = this.state.card !== null;

    return (
      <form id="card-listing" onSubmit={this.handleSubmit}>
        <CardList cards={cardData} onCardChange={this.handleCardChange} />
        <SubmitButton isDisabled={!formIsValid}
          showSpinner={this.state.isSubmitting}
          text={gettext('Subscribe')}
        />
      </form>
    );
  },
});
