import React, { Component, PropTypes } from 'react/addons';
import Notification from 'components/notification';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class NotificationList extends Component {

  static propTypes = {
    TransitionGroup: PropTypes.node,
    notifications: PropTypes.array,
    removeNotification: PropTypes.func.isRequired,
  }

  static defaultProps = {
    TransitionGroup: ReactCSSTransitionGroup,
  }

  render() {
    var CSSTransitionGroup = this.props.TransitionGroup;
    var items = this.props.notifications.map((item) => {
      // this.props.notifications is an array of 2 item arrays.
      var key = item[0];
      var val = item[1];
      return (
        <Notification
          key={key}
          handleAutoHide={this.props.removeNotification.bind(this, key)}
          handleDismissClick={this.props.removeNotification.bind(this, key)}
          {...val} />
      );
    });

    return (
      <CSSTransitionGroup
        className="notification-list"
        component="ul"
        transitionName="notification">
        {items}
      </CSSTransitionGroup>
    );
  }
}
