import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { gettext } from 'utils';

const navData = [
  {
    className: 'profile',
    action: 'showMyAccount',
    text: gettext('My Account'),
  }, {
    className: 'pay-methods',
    action: 'showPayMethods',
    text: gettext('Payment methods'),
  }, {
    className: 'history',
    action: 'showHistory',
    text: gettext('Receipts and history'),
  }, {
    className: 'subs',
    action: 'showSubscriptions',
    text: gettext('Subscriptions'),
  },
];


export default class Management extends Component {

  static propTypes = {
    accessToken: PropTypes.string,
    getPayMethods: PropTypes.func.isRequired,
    getUserSubscriptions: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    tokenSignIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userSignIn: PropTypes.func.isRequired,
    userSignOut: PropTypes.func.isRequired,
    userSubscriptions: PropTypes.array,
  }

  componentDidMount() {
    if (!this.props.user.signedIn) {
      if (this.props.accessToken) {
        console.log('page loaded with access token; signing in');
        this.props.tokenSignIn(this.props.accessToken);
      } else {
        console.log('prompting user to sign in');
        this.props.userSignIn();
      }
    }
  }

  showMyAccount = e => {
    e.preventDefault();
  }

  showPayMethods = e => {
    e.preventDefault();
    this.props.showPayMethods();
  }

  showReceipts = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  showSubscriptions = e => {
    e.preventDefault();
    this.props.getUserSubscriptions();
  }

  userSignIn = e => {
    e.preventDefault();
    this.props.userSignIn();
  }

  userSignOut = e => {
    e.preventDefault();
    this.props.userSignOut();
  }

  renderNav = () => {
     var nav = [];
     for (var i = 0; i < navData.length; i += 1) {
       var navItem = navData[i];
       var isActive = this.props.tab === navItem.className;
       var classes = cx('nav', navItem.className, {'active': isActive});
       nav.push((
         <li className={classes} key={navItem.className}>
           <a href="#" onClick={this.props[navItem.action]}>
             {navItem.text}</a>
         </li>
       ));
     }
     return <ul>{nav}</ul>;
  }

  render() {
    var props = this.props;

    return (
      <div>
        <nav className="sidebar">
          {this.renderNav()}
        </nav>
        <main className="content">{props.children}</main>
      </div>
    );
  }
}
