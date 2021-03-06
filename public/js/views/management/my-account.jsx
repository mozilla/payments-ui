import React, { Component, PropTypes } from 'react';
import { gettext, setTitle } from 'utils';


export default class MyAccount extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    setTitle(gettext('My Account'));
  }

  render() {
    return (
      <div>
        <h1>{gettext('My Account')}</h1>

        <h2>{gettext('Edit My Account')}</h2>
        <div className="row">
          <p className="col email">{this.props.user.email}</p>
          <a
            className="manage-account button quiet"
            href="https://accounts.firefox.com/"
            target="_blank">
            {gettext('Change email address and password')}
          </a>
        </div>

        <h2>{gettext('Delete Account')}</h2>
        <p>{gettext('When you delete your account, all of your ' +
            'subscriptions will be cancelled. This action cannot ' +
            'be undone. Are you sure you want to delete your account?')}</p>
        <div className="row">
          <div className="col"></div>
          <button className="quiet">{gettext('Delete account')}</button>
        </div>
      </div>
    );
  }
}
