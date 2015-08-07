import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { gettext } from 'utils';


export default class SubmitButton extends Component {

  static propTypes = {
    cssModifier: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    showSpinner: PropTypes.bool,
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    modifier: null,
    text: gettext('Submit'),
  }

  render() {
    var { isDisabled, text, showSpinner, ...buttonAttrs } = this.props;

    var buttonClassNames = cx({
      'spinner': showSpinner,
    }, this.props.cssModifier);

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
