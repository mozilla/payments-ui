'use strict';

var cx = require('classnames');
var React = require('react');


module.exports = React.createClass({
  displayName: 'SubmitButton',

  propTypes: {
    isDisabled: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
  },

  render: function() {

    var { isDisabled, text, showSpinner, ...buttonAttrs } = this.props;

    var buttonClassNames = cx({
      'spinner': showSpinner,
    });

    // If we're showing the spinner we want the
    // button to be automagically disabled.
    if (showSpinner) {
      isDisabled = true;
    }

    return (
      <button {...buttonAttrs}
        className={buttonClassNames}
        disabled={isDisabled}
        type="submit">{text}</button>
    );
  },
});
