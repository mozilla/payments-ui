import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';

import cx from 'classnames';


export default class Notification extends Component {

  static propTypes = {
    autoHide: PropTypes.bool,
    handleAutoHide: React.PropTypes.func,
    handleDismissClick: React.PropTypes.func,
    text: PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['info', 'error']),
    userDismissable: React.PropTypes.bool,
  }

  static defaultProps = {
    autoHide: true,
    type: 'info',
    userDismissable: false,
  }

  componentDidMount() {
    if (this.props.userDismissable === false &&
        this.props.autoHide === true) {
      this.props.handleAutoHide({delay: 5000});
    }
  }

  render() {
    var classes = cx('notification', this.props.type,
                     {'autohide': this.props.autoHide});
    return (
      <li className={classes}>
        <span className="text">{this.props.text}</span>
        { this.props.userDismissable ?
          <a href="#"
            onClick={this.props.handleDismissClick}
            className="dismiss">
            <span className="vh">{gettext('Dismiss')}</span>
          </a> : null }
      </li>
    );
  }
}
