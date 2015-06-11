'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;

var CardChoice = require('components/card-choice');
var ProductDetail = require('components/product-detail');
var Spinner = require('components/spinner');
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
    $.ajax({
      method: 'get',
      url: '/api/braintree/mozilla/paymethod/',
      context: this,
    }).then(function(data) {
      if (this.isMounted()) {
        // Ignore react/no-did-mount-set-state eslint warning
        if (data.length) {
          console.log('Card data found, showing card form');
          this.setState({cards: data}); // eslint-disable-line
        } else {
          console.log('No card data found, showing card form');
          this.transitionTo('card-form');
        }
      }
    }).fail(function() {
      // TODO: some error state.
      console.log('Card list retrieval failed');
    });
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
