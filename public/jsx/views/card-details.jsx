'use strict';

var $ = require('jquery');
var React = require('react');

var CardForm = require('components/card-form');
var ProductDetail = require('components/product-detail');
var Spinner = require('components/spinner');

var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'CardDetailsView',

  getInitialState: function() {
    return {
      braintree_token: false,
    };
  },

  componentDidMount: function() {
    console.log('Requesting braintree token');
    $.ajax({
      method: 'post',
      url: '/api/braintree/token/generate/',
      context: this,
    }).then(function(data) {
      if (this.isMounted()) {
        this.setState({'braintree_token': data.token}); // eslint-disable-line
      }
    }).fail(function() {
      // TODO: some error state.
      console.log('failed to get braintree token');
    });
  },

  render: function() {

    if (this.state.braintree_token) {
      return (
        <div className="card-details">
          <ProductDetail productId={this.props.productId} />
          <CardForm
            action="/braintree/"
            data-token={this.state.braintree_token}
            id="braintree-form"
            method="post"
            productId={this.props.productId}
          />
        </div>
      );
    } else {
      return <Spinner text={gettext('Setting up')}/>;
    }
  },
});
