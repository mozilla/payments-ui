import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';

import cx from 'classnames';


export default class Notification extends Component {

  static propTypes = {
    autoHide: PropTypes.bool,
    key: PropTypes.string.isRequired,
    removeNotification: PropTypes.func.isRequired,
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
      this.props.removeNotification(this.props.key, {delay: 5000});
    }
  }

  handleDismissClick = (e) => {
    e.preventDefault();
    this.props.removeNotification(this.props.key);
  }

  render() {
    var classes = cx('notification', this.props.type,
                     {autohide: this.props.autoHide});
    return (
      <li className={classes}>
        <span className="text">{this.props.text}</span>
        { this.props.userDismissable ?
          <a href="#"
            onClick={this.handleDismissClick}
            className="dismiss">
            <span className="vh">{gettext('Dismiss')}</span>
          </a> : null }
      </li>
    );
  }
}
