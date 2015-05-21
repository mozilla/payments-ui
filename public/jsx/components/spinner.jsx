'use strict';

var React = require('react');

var Spinner = React.createClass({
  displayName: 'Spinner',
  propTypes: {
    label: React.PropTypes.string.isRequired,
  },
  render: function() {
    return <div className="spinner">{this.props.label}</div>;
  },
});

module.exports = Spinner;
