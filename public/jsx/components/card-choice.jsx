'use strict';

var $ = require('jquery');
var React = require('react');

var CardItem = require('components/card-item');
var SubmitButton = require('components/submit-button');

var gettext = require('utils').gettext;
var purchaseActions = require('purchase-actions');
var reduxConfig = require('redux-config');


module.exports = React.createClass({
  displayName: 'CardChoice',

  propTypes: {
    cards: React.PropTypes.array.isRequired,
  },

  getInitialState: function() {
    return {
      isSubmitting: false,
      card: this.props.cards.length === 1 ? this.props.cards[0].resource_uri : null,

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
    var cardList = [];

    for (var i = 0; i < cardData.length; i += 1) {
      var card = cardData[i];
      cardList.push(<CardItem {...card} key={'ci-' + i}
                     onChangeHandler={this.handleCardChange}
                     checked={this.state.card === card.resource_uri} />);
    }

    var formIsValid = this.state.card !== null;

    return (
      <form id="card-listing" onSubmit={this.handleSubmit}>
        <ul className="card-listing">
          {cardList}
        </ul>
        <SubmitButton isDisabled={!formIsValid}
          showSpinner={this.state.isSubmitting}
          text={gettext('Subscribe')}
        />
      </form>
    );
  },
});
