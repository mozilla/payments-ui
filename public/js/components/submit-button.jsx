import React, { Component, PropTypes } from 'react';
import cx from 'classnames';


export default class SubmitButton extends Component {

  static propTypes = {
    isDisabled: PropTypes.bool,
    modifier: PropTypes.string.isRequired,
    showSpinner: PropTypes.bool,
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    modifier: null,
  }

  render() {
    var { isDisabled, text, showSpinner, ...buttonAttrs } = this.props;

    var buttonClassNames = cx({
      'spinner': showSpinner,
    }, this.props.modifier);

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
  }
}
