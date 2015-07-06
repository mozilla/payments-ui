'use strict';

var React = require('react');

var gettext = require('utils').gettext;

module.exports = React.createClass({
  displayName: 'Spinner',

  propTypes: {
    text: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      text: gettext('Loading'),
    };
  },

  render: function() {
    return (
      <div className="spinner-cont">
        <div className="spinner" />
        <span className="text">{this.props.text}</span>
      </div>
    );
  },
});
