import React, { Component, PropTypes } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionSection } from 'components/accordion';

import { gettext } from 'utils';


export default class Management extends Component {

  static propTypes = {
    getPayMethods: PropTypes.func.isRequired,
  };

  render() {
    return (

        <div>
          <header className="top-nav">
            <h1 className="logo">Firefox Payments</h1>
            <button>{gettext('Sign Out')}</button>
          </header>

          <div className="content">
            <div className="user">
              <p>Hello, placeholder@placeholder.com</p>
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
                  <p>placeholder@placeholder.com</p>
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
