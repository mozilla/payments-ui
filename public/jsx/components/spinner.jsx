'use strict';

var React = require('react');

var Spinner = React.createClass({
  displayName: 'Spinner',
  propTypes: {
    text: React.PropTypes.string.isRequired,
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

module.exports = Spinner;
