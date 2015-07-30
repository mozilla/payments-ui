import React, { Component, PropTypes } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionSection } from 'components/accordion';
import SubscriptionList from 'components/subscription-list';

import { gettext } from 'utils';


export default class Management extends Component {

  static propTypes = {
    accessToken: PropTypes.string,
    getPayMethods: PropTypes.func.isRequired,
    getUserSubscriptions: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
    tokenSignIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userSignIn: PropTypes.func.isRequired,
    userSignOut: PropTypes.func.isRequired,
    userSubscriptions: PropTypes.array,
  }

  componentDidMount() {
    if (this.props.accessToken && !this.props.user.signedIn) {
      console.log('page loaded with access token; signing in');
      this.props.tokenSignIn(this.props.accessToken);
    }
  }

  showSubscriptions = event => {
    event.preventDefault();
    this.props.getUserSubscriptions();
  }

  userSignIn = event => {
    event.preventDefault();
    this.props.userSignIn();
  }

  userSignOut = event => {
    event.preventDefault();
    this.props.userSignOut();
  }

  handleShowPayMethods = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.showPayMethods();
  }

  render() {
    var greeting;
    var headerOnClick;
    var headerText;

    if (this.props.user.signedIn) {
      headerText = gettext('Sign Out');
      headerOnClick = this.userSignOut;
      // TODO: fix this when gettext() has formatters.
      greeting = 'Hello, ' + this.props.user.email;
    } else {
      headerText = gettext('Sign In');
      headerOnClick = this.userSignIn;
      greeting = gettext('Not signed in');
    }

    return (

        <div>
          <header className="top-nav">
            <h1 className="logo">Firefox Payments</h1>
            <button id="sign-in-toggle"
                    onClick={headerOnClick}>{headerText}</button>
          </header>

          <div className="content">
            <div className="user">
              <p>{greeting}</p>
            </div>

            <Accordion>
              <AccordionSection>
                <header>
                  <h2>{gettext('Payment Accounts')}</h2>
                  <button
                    onClick={this.handleShowPayMethods}>{gettext('Change')}
                  </button>
                </header>
              </AccordionSection>

              <AccordionSection>
                <header>
                  <h2>{gettext('Receipts and History')}</h2>
                  <button data-activate>{gettext('View')}</button>
                </header>
                <AccordionContent>
                  <p>Placeholder</p>
                </AccordionContent>
              </AccordionSection>

              <AccordionSection>
                <header>
                  <h2>{gettext('Subscriptions')}</h2>
                  <button
                    onClick={this.showSubscriptions}
                    id="show-subscriptions"
                    data-activate>{gettext('View/Change')}</button>
                </header>
                <AccordionContent>
                  <SubscriptionList
                    subscriptions={this.props.userSubscriptions}
                  />
                </AccordionContent>
              </AccordionSection>

              <AccordionSection>
                <header>
                  <h2>{gettext('Email Address and Password')}</h2>
                  <a className="button"
                     href="https://mozilla.org/"
                     target="_blank">{gettext('Change')}</a>
                  {this.props.user ? <p>{this.props.user.email}</p> : null}
                </header>
              </AccordionSection>

              <AccordionSection>
                <header>
                  <h2>{gettext('Delete Account')}</h2>
                  <button data-activate>{gettext('Delete')}</button>
                </header>
                <AccordionContent>
                  <p>Placeholder content</p>
                </AccordionContent>
              </AccordionSection>
            </Accordion>
          </div>
        </div>
    );
  }
}
