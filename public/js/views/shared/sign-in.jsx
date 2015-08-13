import React, { Component, PropTypes } from 'react';

import Spinner from 'components/spinner';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class SignIn extends Component {

  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    allowUserSignIn: PropTypes.bool,
    error: PropTypes.func.isRequired,
    tokenSignIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userSignIn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    allowUserSignIn: true,
  }

  componentDidMount() {
    tracking.setPage('/sign-in');
    if (!this.props.user.signedIn) {
      if (this.props.accessToken) {
        console.log('signing in with access token');
        this.props.tokenSignIn(this.props.accessToken);
      } else if (this.props.allowUserSignIn) {
        console.log('prompting user to sign in');
        this.props.userSignIn();
      } else {
        return this.props.error(
          'cannot sign in: no access token provided'
        );
      }
    }
  }

  render() {
    return <Spinner text={gettext('Signing In')}/>;
  }

}
