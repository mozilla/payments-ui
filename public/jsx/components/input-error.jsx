'use strict';

var React = require('react');

var InputError = React.createClass({
  displayName: 'InputError',

  propTypes: {
    optModifier: React.PropTypes.oneOf(['center', 'right', 'left']),
    text: React.PropTypes.string.isRequired,
  },

  render: function() {
    var { text, ...toolTipAttrs } = this.props;

    var errorClassList = ['tooltip'];
    errorClassList.push(this.props.optModifier || 'left');
    var errorClass = errorClassList.join(' ');

    return (
      <span {...toolTipAttrs}
            className={errorClass}>{text}</span>
    );
  },
});

module.exports = InputError;
