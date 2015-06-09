'use strict';

var classNames = require('classnames');
var React = require('react');


module.exports = React.createClass({
  displayName: 'InputError',

  propTypes: {
    errorMessage: React.PropTypes.string.isRequired,
    errorModifier: React.PropTypes.oneOf(['center', 'right', 'left']),
  },

  render: function() {
    var { errorMessage, ...toolTipAttrs } = this.props;
    var errorClass = classNames([
      'tooltip',
      this.props.errorModifier || 'left',
    ]);
    return (
      <span {...toolTipAttrs}
            className={errorClass}>{errorMessage}</span>
    );
  },
});
