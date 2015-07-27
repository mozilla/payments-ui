import $ from 'jquery';
import CardValidator from 'card-validator';
import React, { Component, PropTypes } from 'react';
import braintree from 'braintree-web';

import { gettext } from 'utils';

import CardInput from 'components/card-input';
import SubmitButton from 'components/submit-button';
import * as purchaseActions from 'actions/purchase';
import dataStore from 'data-store';


const defaultFieldAttrs = {
  'autoComplete': 'off',
  // inputMode is not yet supported in React.
  // See https://github.com/facebook/react/pull/3798
  'inputMode': 'numeric',
  'type': 'tel',
};

const errorKeyToFieldMap = {
  '__all__': {
    field: 'card',
    error: 'declined',
  },
  'fraud': {
    field: 'card',
    error: 'declined',
  },
  'cvv': {
    field: 'cvv',
    error: 'invalid',
  },
};

const fieldProps = {
  card: {
    'attrs': defaultFieldAttrs,
    'classNames': ['card'],
    'errors': {
      invalid: gettext('Incorrect card number'),
      declined: gettext('Card was declined'),
    },
    'id': 'card',
    'placeholder': gettext('Card number'),
    'validator': CardValidator.number,
  },
  expiration: {
    'attrs': defaultFieldAttrs,
    'classNames': ['expiration'],
    'errors': {
      invalid: gettext('Invalid expiry date'),
    },
    'id': 'expiration',
    // Expiration pattern doesn't change based on card type.
    'pattern': '11/11',
    'placeholder': 'MM/YY',
    'validator': CardValidator.expirationDate,
  },
  cvv: {
    'attrs': defaultFieldAttrs,
    'autocomplete': 'off',
    'classNames': ['cvv'],
    'errors': {
      invalid: gettext('Invalid CVV'),
    },
    'errorModifier': 'right',
    'id': 'cvv',
    'validator': CardValidator.cvv,
  },
};


export default class CardForm extends Component {

  static propTypes = {
    card: PropTypes.object,
    cvv: PropTypes.object,
    'data-token': PropTypes.string.isRequired,
    expiration: PropTypes.object,
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      cardType: null,
      errors: {},
      card: '',
      expiration: '',
      cvv: '',
    };
  }

  handleChange = (e) => {
    var fieldId = e.target.id;
    var val = e.target.value;

    var fieldData = fieldProps[fieldId];
    var valData = fieldData.validator(this.stripPlaceholder(val));
    fieldData.hasVal = val.length > 0 || false;
    fieldData.isValid = valData.isValid === true;
    fieldData.showError = !valData.isValid && !valData.isPotentiallyValid;
    fieldData.errorMessage = fieldData.errors.invalid;

    var newState = {
      [e.target.id]: e.target.value,
    };

    // Only the card field has card data upon validation.
    if (fieldId === 'card') {
      var cardData = valData.card || {};
      newState.cardType = cardData.type;
    }

    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmitting: true});
    var that = this;
    var client = new braintree.api.Client({
      clientToken: this.props['data-token'],
    });
    client.tokenizeCard({
      number: this.state.card,
      expirationDate: this.state.expiration,
      cvv: this.state.cvv,
    }, function(err, nonce) {
      if (err) {
        // TODO: error handling
        console.log(err);
      } else {
        $.ajax({
          data: {
            pay_method_nonce: nonce,
            plan_id: that.props.productId,
          },
          url: '/api/braintree/subscriptions/',
          method: 'post',
          dataType: 'json',
          context: that,
        }).done(function() {
          console.log('Successfully subscribed + completed payment');

          dataStore.dispatch(
            purchaseActions.complete()
          );

        }).fail(function($xhr) {
          this.processApiErrors($xhr.responseJSON);
        });
      }
    });
  }

  processApiErrors(errors) {
    if (errors.error_response && errors.error_response.braintree) {
      var apiErrors = errors.error_response.braintree;
      // Iterate over the error object and create a new data
      // structure keyed by field or otherwise push onto
      // a list of generic errors.
      Object.keys(apiErrors).forEach(function(key) {
        console.log('API ErrorMessage: ' + JSON.stringify(apiErrors[key]));
        var errorData = errorKeyToFieldMap[key] || {};
        var field = errorData.field;
        if (field) {
          var fieldData = fieldProps[field];
          fieldData.isValid = false;
          fieldData.showError = true;
          fieldData.errorMessage = fieldData.errors[errorData.error];
        }
      });
    }
    this.setState({
      isSubmitting: false,
    });
  }

  stripPlaceholder(val) {
    return val ? val.replace(/_/g, '') : '';
  }

  render() {
    var formIsValid = true;

    // Update form validity based on fieldProps.
    Object.keys(fieldProps).forEach(function(field) {
      if (!fieldProps[field].isValid) {
        formIsValid = false;
      }
    });

    return (
      <form {...this.props} onSubmit={this.handleSubmit}>
        <CardInput {...fieldProps.card}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <CardInput {...fieldProps.expiration}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <CardInput {...fieldProps.cvv}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <SubmitButton isDisabled={!formIsValid}
          showSpinner={this.state.isSubmitting}
          text={gettext('Subscribe')} />
      </form>
    );
  }
}
