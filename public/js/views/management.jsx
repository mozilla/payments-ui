import React, { Component, PropTypes } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionSection } from 'components/accordion';

import { gettext } from 'utils';


export default class Management extends Component {

  static propTypes = {
    getPayMethods: PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    userSignIn: React.PropTypes.func.isRequired,
    userSignOut: React.PropTypes.func.isRequired,
  }

  userSignIn = click => {
    click.preventDefault();
    this.props.userSignIn();
  }

  userSignOut = click => {
    click.preventDefault();
    this.props.userSignOut();
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
            <button onClick={headerOnClick}>{headerText}</button>
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
                    onClick={this.props.getPayMethods}>{gettext('Change')}
                  </button>
                </header>
              </AccordionSection>

              <AccordionSection>
                <header>
                  <h2>{gettext('Receipts and Subscriptions')}</h2>
                  <button data-activate>{gettext('View/Change')}</button>
                </header>
                <AccordionContent>
                  <p>Placeholder</p>
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
