import React, { Component, PropTypes } from 'react';

import Spinner from 'components/spinner';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class SignIn extends Component {

  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    tokenSignIn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    tracking.setPage('/sign-in');
    this.props.tokenSignIn(this.props.accessToken);
  }

  render() {
    return <Spinner text={gettext('Signing in')}/>;
  }

}
