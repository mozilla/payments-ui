'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;

var Spinner = require('components/spinner');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'LoginView',

  propTypes: {
    apiSource: React.PropTypes.string.isRequired,
  },

  mixins: [Navigation],

  getDefaultProps: function() {
    return {
      apiSource: '/api/auth/sign-in/',
    };
  },

  getInitialState: function() {
    return {
      is_logged_in: false,
    };
  },

  componentDidMount: function() {
    var { router } = this.context;
    $.ajax({
      data: {
        access_token: router.getCurrentQuery().access_token,
      },
      method: 'post',
      url: this.props.apiSource,
      context: this,
    }).then(function() {
      if (this.isMounted()) {
        this.setState({'is_logged_in': true}); // eslint-disable-line
        this.transitionTo('card-form');
      }
    }).fail(function() {
      // TODO: some error state.
      console.log('login failed');
    });
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  render: function() {
    return <Spinner text={gettext('Logging in')}/>;
  },
});
