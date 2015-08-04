import React, { Component, PropTypes } from 'react';

import Spinner from 'components/spinner';

import { gettext } from 'utils';
import tracking from 'tracking';

export default class BrainTree extends Component {

  static propTypes = {
    getBraintreeToken: PropTypes.func.isRequired,
  };

  componentDidMount() {
    tracking.setPage('/braintree-token');
    this.props.getBraintreeToken();
  }

  render() {
    return <Spinner text={gettext('Setting up payment')}/>;
  }

}
