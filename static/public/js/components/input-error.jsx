import React, { Component, PropTypes } from 'react';
import cx from 'classnames';


export default class InputError extends Component {

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    errorModifier: PropTypes.oneOf(['center', 'right', 'left']),
  }

  render() {
    var { errorMessage, ...toolTipAttrs } = this.props;
    var errorClass = cx([
      'tooltip',
      this.props.errorModifier || 'left',
    ]);
    return (
      <span {...toolTipAttrs}
        className={errorClass}>{errorMessage}</span>
    );
  }

}
