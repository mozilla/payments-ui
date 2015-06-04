'use strict';

var classNames = require('classnames');
var React = require('react');
var gettext = require('utils').gettext;


var SubmitButton = React.createClass({
  displayName: 'SubmitButton',

  propTypes: {
    isDisabled: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
  },

  render: function() {

    var { isDisabled, ...buttonAttrs } = this.props;
    var buttonClassNames = classNames({
      'spinner': this.props.showSpinner,
    });

    // If we're showing the spinner we want the
    // button to be automagically disabled.
    if (this.props.showSpinner) {
      isDisabled = true;
    }

    return (
      <button {...buttonAttrs}
        className={buttonClassNames}
        disabled={isDisabled}
        type="submit">{gettext('Subscribe')}</button>
    );
  },
});

module.exports = SubmitButton;
