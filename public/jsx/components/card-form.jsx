'use strict';

var $ = require('jquery');
var CardValidator = require('card-validator');
var Navigation = require('react-router').Navigation;
var React = require('react');
var braintree = require('braintree-web');

var errorCodes = require('error-codes');
var utils = require('utils');
var gettext = utils.gettext;

var CardInput = require('components/card-input');
var SubmitButton = require('components/submit-button');


module.exports = React.createClass({

  displayName: 'CardForm',

  propTypes: {
    'data-token': React.PropTypes.string.isRequired,
    'card': React.PropTypes.object,
    'cvv': React.PropTypes.object,
    'expiration': React.PropTypes.object,
    'id': React.PropTypes.string.isRequired,
  },

  mixins: [Navigation],

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
      'classNames': ['card'],
      'errorMessage': gettext('Incorrect card number'),
      'id': 'card',
      'data-braintree-name': 'number',
      'placeholder': gettext('Card number'),
      'type': 'tel',
      'validator': CardValidator.number,
    },
    expiration: {
      'classNames': ['expiration'],
      'data-braintree-name': 'expiration_date',
      'errorMessage': gettext('Invalid expiry date'),
      'id': 'expiration',
      // Expiration pattern doesn't change based on card type.
      'pattern': '11/11',
      'placeholder': 'MM/YY',
      'type': 'tel',
      'validator': CardValidator.expirationDate,
    },
    cvv: {
      'classNames': ['cvv'],
      'data-braintree-name': 'cvv',
      'errorMessage': gettext('Invalid CVV'),
      'errorModifier': 'right',
      'id': 'cvv',
      'type': 'tel',
      'validator': CardValidator.cvv,
    },
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  handleChange: function(e) {
    var errors = this.state.errors;
    var fieldId = e.target.id;
    var val = e.target.value;

    var fieldProps = this.fieldProps[fieldId];
    var valData = fieldProps.validator(this.stripPlaceholder(val));
    fieldProps.hasVal = val.length > 0 || false;
    fieldProps.isValid = valData.isValid === true;
    fieldProps.showError = !valData.isValid && !valData.isPotentiallyValid;

    // Remove existing API error on value change.
    if (errors.fields && errors.fields[fieldId]) {
      delete errors.fields[fieldId];
    }

    var newState = {
      errors: errors,
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
    var { router } = this.context;
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
            plan_id: 'mozilla-concrete-brick',
          },
          url: '/api/braintree/subscriptions/',
          method: 'post',
          dataType: 'json',
          context: that,
        }).done(function() {
          console.log('Successfully subscribed + completed payment');
          router.transitionTo('complete');
        }).fail(function($xhr) {
          var errors = this.processApiErrors($xhr.responseJSON);
          this.setState({
            isSubmitting: false,
            errors: errors,
          });
        });
      }
    });
  },

  processApiErrors: function(errors) {
    errors = errors || {};
    var newErrors = {
      fields: {},
      generic: [],
    };
    var that = this;
    if (errors.error_response && errors.error_response.braintree) {
      var apiErrors = errors.error_response.braintree;
      // Iterate over the error object and create a new data
      // structure keyed by field or otherwise push onto
      // a list of generic errors.
      Object.keys(apiErrors).forEach(function(key) {
        var errorList = apiErrors[key];
        for (var i = 0; i < errorList.length; i += 1) {
          var errorObj = errorCodes[errorList[i].code] || errorCodes.default;
          errorObj.code = errorList[i].code;
          if (errorObj.field) {
            if (!newErrors.fields[errorObj.field]){
              newErrors.fields[errorObj.field] = [];
            }
            newErrors.fields[errorObj.field].push(errorObj);
            that.fieldProps[errorObj.field].showError = true;
            that.fieldProps[errorObj.field].isValid = false;
          } else {
            newErrors.generic.push(errorObj);
          }
        }
      });
    }
    return newErrors;
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
          showSpinner={this.state.isSubmitting} />
      </form>
    );
  },
});
