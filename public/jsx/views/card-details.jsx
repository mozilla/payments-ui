'use strict';

var $ = require('jquery');
var React = require('react');

var CardForm = require('components/card-form');
var Spinner = require('components/spinner');

var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'CardDetailsView',

  getInitialState: function() {
    return {
      braintree_token: false,
    };
  },

  propTypes: {
    apiSource: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      apiSource: '/api/braintree/token/generate/',
    };
  },

  componentDidMount: function() {
    $.ajax({
      method: 'post',
      url: this.props.apiSource,
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
      return (<CardForm
        action="/braintree/"
        data-token={this.state.braintree_token}
        id="braintree-form"
        method="post"/>);
    } else {
      return <Spinner text={gettext('Setting up')}/>;
    }
  },
});
