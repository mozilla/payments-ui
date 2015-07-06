'use strict';

var React = require('react');

var Spinner = require('components/spinner');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'Login',

  propTypes: {
    accessToken: React.PropTypes.string.isRequired,
    signIn: React.PropTypes.func.isRequired,
  },

  componentDidMount: function() {
    this.props.signIn(this.props.accessToken);
  },

  render: function() {
    return <Spinner text={gettext('Signing in')}/>;
  },

});
