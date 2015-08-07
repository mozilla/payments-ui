import React, { Component, PropTypes } from 'react';
import SubscriptionList from 'components/subscription-list';

import { gettext } from 'utils';


export default class Subscriptions extends Component {

  static propTypes = {
    getUserSubscriptions: PropTypes.func.isRequired,
    userSubscriptions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getUserSubscriptions();
  }

  render() {

    return (
      <div className="subscriptions">
        <h1>{gettext('Subscriptions')}</h1>
        <SubscriptionList
          subscriptions={this.props.userSubscriptions}
        />
      </div>
    );
  }
}
