import React, { Component, PropTypes } from 'react';

import $ from 'jquery';
import PayMethodItem from 'components/pay-method-item';
import PayMethodDropDown from 'components/pay-method-drop-down';
import SubmitButton from 'components/submit-button';
import Subscription from 'components/subscription';
import Spinner from 'components/spinner';

import { default as tracking } from 'tracking';
import { gettext, getPayMethodFromUri, setTitle } from 'utils';


export default class ConfirmDelPayMethod extends Component {

  static propTypes = {
    affectedSubscriptions: PropTypes.array,
    delPayMethod: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    getSubsByPayMethod: PropTypes.func.isRequired,
    payMethodUri: PropTypes.string.isRequired,
    payMethods: PropTypes.array.isRequired,
    showDelPayMethod: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
    updateSubPayMethod: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      payMethod: getPayMethodFromUri(
        this.props.payMethods, this.props.payMethodUri),
    };
  }

  componentDidMount() {
    setTitle('Delete Payment Method?');
    tracking.setPage('/confirm-del-pay-method');
    this.props.getSubsByPayMethod(this.props.payMethodUri);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmitting: true});

    var affectedSubs = this.props.affectedSubscriptions;

    var deletePayMethod = () => {
      return this.props.delPayMethod(this.props.payMethodUri).done(() => {
        this.props.showPayMethods();
      });
    };

    // If there are affected subs...
    if (affectedSubs) {
      var deferreds = [];
      var select = e.target.querySelector('[name="new-pay-method"]');
      //... and there's a select for choosing the new pay method
      if (select && select.options) {
        var newPayMethodUri = select.options[select.selectedIndex].value;
        // Update the list of subs to use newPayMethodUri
        for (var i = 0; i < affectedSubs.length; i += 1) {
          var sub = affectedSubs[i];
          deferreds.push(
            this.props.updateSubPayMethod(sub.resource_uri, newPayMethodUri));
        }

        // Update all the affected subs.
        $.when(...deferreds).done(() => {
          // Delete the card in question.
          console.log('Subs update successful now deleting payMethod');
          deletePayMethod();
        }).fail(() => {
          // Abort any outstanding requests
          console.log('Aborting outstanding requests');
          for (var j = 0; j < deferreds.length; j += 1) {
            deferreds[j].abort();
          }
          this.props.error('Failed to update subscriptions');
        });
      } else {
        console.log('Deletion of payMethodUri', this.props.payMethodUri,
                    'amounts to cancellation of', affectedSubs);
        deletePayMethod();
      }
    } else {
      // Simply delete the pay method.
      console.log('No affected subs deleting', this.props.payMethodUri);
      deletePayMethod();
    }
  }

  getAltPayMethods = (payMethodResourceUri) => {
    // Return the list of pay methods less the one that has
    // a resource_uri matching `payMethodResourceUri`.
    return this.props.payMethods.filter(
      payMethod => payMethod.resource_uri !== payMethodResourceUri);
  }

  renderSubs = () => {
    var subs = [];
    var affectedSubs = this.props.affectedSubscriptions;
    for (var i = 0; i < affectedSubs.length; i += 1) {
      var sub = affectedSubs[i];
      subs.push(
        <li key={sub.id}>
          <Subscription {...sub}
            showNav={false}
            showNextPayment={false}
          />
        </li>
      );
    }
    return (
      <ul className="subscription-list compact">{subs}</ul>
    );
  }

  renderConfirmation = () => {
    // If we have subs tied to the pay method we are looking to delete
    // alternative pay methods to offer.
    if (this.props.affectedSubscriptions &&
        this.props.affectedSubscriptions.length) {
      // Get alternative pay methods aside from the pay method
      // we are looking to delete.
      var altPayMethods = this.getAltPayMethods(this.props.payMethodUri);

      // If we have alternatives then the user can choose the pay
      // method to use in-place of the pay method being deleted.
      if (altPayMethods.length) {
        return (
          <div>
            <PayMethodItem
              payMethod={this.state.payMethod}
              inputType="hidden" />
            <hr />
            <p>{gettext('These subscriptions will be paid using')}</p>
            <PayMethodDropDown
              payMethods={altPayMethods}
              selectNameAttr="new-pay-method"
              showDefaultOption={false}
            />
            {this.renderSubs()}
          </div>
        );
      // If there's no alternative pay methods then deletion
      // amounts to cancellation of the affected subs.
      } else {
        return (
          <div>
            <PayMethodItem
              inputType="hidden"
              payMethod={this.state.payMethod}
            />
            <hr />
            <p className="cancellation">
              {gettext('These subscriptions will be cancelled')}</p>
            {this.renderSubs()}
          </div>
        );
      }
    // No subs are tied to this pay method. Just show a deletion
    // confirmation.
    } else {
      return (
        <div>
          <p className="deletion">{gettext('Are you sure you want to delete' +
            ' the following payment method?')}</p>
          <PayMethodItem
            inputType="hidden"
            payMethod={this.state.payMethod}
          />
        </div>
      );
    }
  }

  renderForm() {

    if (this.props.affectedSubscriptions === null) {
      return <Spinner/>;
    } else {

      var buttonContent = (
        <span>
          {gettext('Delete Credit Card')}
          <span className="vh">{gettext('ending in')}</span>
          <span aria-hidden="true"> ●●●● </span>
          {this.state.payMethod.truncated_id}
        </span>
      );

      return (
        <div>
          <form onSubmit={this.handleSubmit} className="small-form">
            {this.renderConfirmation()}
            <SubmitButton
              showSpinner={this.state.isSubmitting}
              content={buttonContent}
              cssModifier="warning"
            />
          </form>
          <a className="back" href="#"
            onClick={this.props.showDelPayMethod}>
            {gettext('Back')}</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>{gettext('Delete Payment Method?')}</h1>
        {this.renderForm()}
      </div>
    );
  }
}
