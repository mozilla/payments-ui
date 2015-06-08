'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;

var CardItem = require('components/card-item');
var SubmitButton = require('components/submit-button');

var gettext = require('utils').gettext;


module.exports = React.createClass({
  displayName: 'CardList',

  propTypes: {
    cards: React.PropTypes.array.isRequired,
  },

  mixins: [Navigation],

  getInitialState: function() {
    return {
      isSubmitting: false,
      card: null,
    };
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  handleSubmit: function(e) {
    var { router } = this.context;
    e.preventDefault();

    this.setState({isSubmitting: true});

    $.ajax({
      data: {
        pay_method_uri: this.state.card,
        plan_id: 'mozilla-concrete-brick',
      },
      url: '/api/braintree/subscriptions/',
      method: 'post',
      dataType: 'json',
      context: this,
    }).done(function() {
      console.log('Successfully subscribed with existing card');
      router.transitionTo('complete');
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
                     onChangeHandler={this.handleCardChange} />);
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
