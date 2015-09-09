import React, { Component, PropTypes } from 'react/addons';
import Notification from 'components/notification';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class NotificationList extends Component {

  static propTypes = {
    TransitionGroup: PropTypes.node,
    // notifications is an Mapable array of 2 item arrays
    // e.g: [[key, notificationObj], [key, notificationObj], ...]
    notifications: PropTypes.array.isRequired,
    removeNotification: PropTypes.func.isRequired,
  }

  static defaultProps = {
    TransitionGroup: ReactCSSTransitionGroup,
  }

  render() {
    var CSSTransitionGroup = this.props.TransitionGroup;
    var items = this.props.notifications.map((item) => {
      var [key, val] = item;

      return (
        <Notification
          key={key}
          removeNotification={this.props.removeNotification}
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
