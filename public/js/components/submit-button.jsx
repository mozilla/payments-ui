import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { gettext } from 'utils';


export default class SubmitButton extends Component {

  static propTypes = {
    content: PropTypes.string,
    cssModifier: PropTypes.string,
    isDisabled: PropTypes.bool,
    showSpinner: PropTypes.bool,
  }

  static defaultProps = {
    cssModifier: null,
    content: gettext('Submit'),
  }

  render() {
    var { isDisabled, content, showSpinner, ...buttonAttrs } = this.props;

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
        type="submit">{content}</button>
    );
  }
}
