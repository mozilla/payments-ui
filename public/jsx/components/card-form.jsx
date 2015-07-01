'use strict';

var $ = require('jquery');
var CardValidator = require('card-validator');
var React = require('react');
var braintree = require('braintree-web');

var utils = require('utils');
var gettext = utils.gettext;

var CardInput = require('components/card-input');
var SubmitButton = require('components/submit-button');
var purchaseActions = require('actions/purchase');
var reduxConfig = require('redux-config');


var defaultFieldAttrs = {
  'autoComplete': 'off',
  // inputMode is not yet supported in React.
  // See https://github.com/facebook/react/pull/3798
  'inputMode': 'numeric',
  'type': 'tel',
};


module.exports = React.createClass({

  displayName: 'CardForm',

  propTypes: {
    'data-token': React.PropTypes.string.isRequired,
    'card': React.PropTypes.object,
    'cvv': React.PropTypes.object,
    'expiration': React.PropTypes.object,
    'id': React.PropTypes.string.isRequired,
    'productId': React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      isSubmitting: false,
      cardType: null,
      errors: {},
      card: '',
      expiration: '',
      cvv: '',
    };
  },

  fieldProps: {
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
  },

  handleChange: function(e) {
    var fieldId = e.target.id;
    var val = e.target.value;

    var fieldProps = this.fieldProps[fieldId];
    var valData = fieldProps.validator(this.stripPlaceholder(val));
    fieldProps.hasVal = val.length > 0 || false;
    fieldProps.isValid = valData.isValid === true;
    fieldProps.showError = !valData.isValid && !valData.isPotentiallyValid;
    fieldProps.errorMessage = fieldProps.errors.invalid;

    var newState = {
      [e.target.id]: e.target.value,
    };

    // Only the card field has card data upon validation.
    if (fieldId === 'card') {
      var cardData = valData.card || {};
      newState.cardType = cardData.type;
    }

    this.setState(newState);
  },

  handleSubmit: function(e) {
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

          reduxConfig.default.dispatch(
            purchaseActions.complete()
          );

        }).fail(function($xhr) {
          this.processApiErrors($xhr.responseJSON);
        });
      }
    });
  },

  errorKeyToFieldMap: {
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
  },

  processApiErrors: function(errors) {
    var that = this;
    if (errors.error_response && errors.error_response.braintree) {
      var apiErrors = errors.error_response.braintree;
      // Iterate over the error object and create a new data
      // structure keyed by field or otherwise push onto
      // a list of generic errors.
      Object.keys(apiErrors).forEach(function(key) {
        console.log('API ErrorMessage: ' + JSON.stringify(apiErrors[key]));
        var errorData = that.errorKeyToFieldMap[key] || {};
        var field = errorData.field;
        if (field) {
          var fieldData = that.fieldProps[field];
          fieldData.isValid = false;
          fieldData.showError = true;
          fieldData.errorMessage = fieldData.errors[errorData.error];
        }
      });
    }
    this.setState({
      isSubmitting: false,
    });
  },

  stripPlaceholder: function(val) {
    return val ? val.replace(/_/g, '') : '';
  },

  render: function() {

    var formIsValid = true;
    var that = this;

    // Update form validity based on fieldProps.
    Object.keys(this.fieldProps).forEach(function(field) {
      if (!that.fieldProps[field].isValid) {
        formIsValid = false;
      }
    });

    return (
      <form {...this.props} onSubmit={this.handleSubmit}>
        <CardInput {...this.fieldProps.card}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <CardInput {...this.fieldProps.expiration}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <CardInput {...this.fieldProps.cvv}
          cardType={this.state.cardType}
          onChangeHandler={this.handleChange} />
        <SubmitButton isDisabled={!formIsValid}
          showSpinner={this.state.isSubmitting}
          text={gettext('Subscribe')} />
      </form>
    );
  },
});
