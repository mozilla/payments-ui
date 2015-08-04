import React, { Component, PropTypes } from 'react';

import { gettext } from 'utils';
import Spinner from 'components/spinner';
import Subscription from 'components/subscription';


export default class SubscriptionList extends Component {

  static propTypes = {
    subscriptions: PropTypes.array,
  }

  static defaultProps = {
    subscriptions: null,
  }

  render() {
    console.log('subscriptions:', this.props.subscriptions);

    if (this.props.subscriptions === null) {
      return <Spinner/>;
    } else {

      var subs = [];
      this.props.subscriptions.forEach((data) => {
        subs.push(
          <li key={data.id} className="subscription">
            <Subscription {...data}/>
          </li>
        );
      });

      if (subs.length) {
        return (
          <ul className="subscription-list">
            {subs}
          </ul>
        );
      } else {
        return <p>{gettext("You haven't subscribed to anything yet.")}</p>;
      }
    }
  }
}
