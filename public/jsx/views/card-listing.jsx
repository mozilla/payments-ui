'use strict';

var React = require('react');
var Navigation = require('react-router').Navigation;

var CardChoice = require('components/card-choice');
var ProductDetail = require('components/product-detail');
var Spinner = require('components/spinner');
var UserStore = require('user-store');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'CardListingView',

  mixins: [Navigation],

  getInitialState: function() {
    return {
      cards: null,
    };
  },

  componentDidMount: function() {
    var user = UserStore.getSignedInUser();
    console.log('got logged in user:', user);

    if (user.payment_methods.length) {
      console.log('Card data found, showing card form');
      this.setState({cards: user.payment_methods});
    } else {
      console.log('No card data found, showing card form');
      this.transitionTo('card-form');
    }
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  render: function() {
    if (this.state.cards) {
      return (
        <div className="card-listing">
          <ProductDetail productId={this.props.productId} />
          <CardChoice
            cards={this.state.cards}
            productId={this.props.productId}
          />
        </div>
      );
    } else {
      return <Spinner text={gettext('Loading')}/>;
    }
  },
});
