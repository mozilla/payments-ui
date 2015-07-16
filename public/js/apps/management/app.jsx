'use strict';

var React = require('react');
var {
  Accordion,
  AccordionContent,
  AccordionSection} = require('components/accordion');

var Modal = require('components/modal');

var gettext = require('utils').gettext;


var Management = React.createClass({

  displayName: 'ManagementApp',

  render: function() {
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
                <button data-activate>{gettext('Change')}</button>
              </header>
              <AccordionContent>
                <p>Payment list will go here</p>
                <ul>
                  <li>4111 1111 1111 1111</li>
                  <li>4222 2222 2222 2222</li>
                </ul>
              </AccordionContent>
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
  },
});

module.exports = {
  component: Management,
  init: function() {
    React.render(<Modal />, document.getElementById('modal'));
    React.render(<Management />, document.getElementById('view'));
  },
};
