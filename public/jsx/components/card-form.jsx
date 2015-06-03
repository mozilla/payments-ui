'use strict';

var $ = require('jquery');
var CardValidator = require('card-validator');
var Navigation = require('react-router').Navigation;
var React = require('react');
var braintree = require('braintree-web');

var utils = require('utils');

var CardInput = require('components/card-input');
var SubmitButton = require('components/submit-button');

var cardPatterns = require('card-patterns');
var errorCodes = require('error-codes');

module.exports = React.createClass({

  displayName: 'CardForm',

  propTypes: {
    'data-token': React.PropTypes.string.isRequired,
    card: React.PropTypes.object,
    cvv: React.PropTypes.object,
    expiration: React.PropTypes.object,
    id: React.PropTypes.string.isRequired,
  },

  mixins: [Navigation],

  getDefaultProps: function() {
    return {
      card: {
        'errorMessage': utils.gettext('Incorrect card number'),
        'id': 'card',
        'data-braintree-name': 'number',
        'type': 'tel',
        'validator': CardValidator.number,
      },
      expiration: {
        'classNames': ['expiration'],
        'data-braintree-name': 'expiration_date',
        'errorMessage': utils.gettext('Invalid expiry date'),
        'id': 'expiration',
        'type': 'tel',
        'validator': CardValidator.expirationDate,
      },
      cvv: {
        'classNames': ['cvv'],
        'data-braintree-name': 'cvv',
        'errorMessage': utils.gettext('Invalid CVV'),
        'errorModifier': 'right',
        'id': 'cvv',
        'type': 'tel',
        'validator': CardValidator.cvv,
      },
    };
  },

  getInitialState: function() {
    return {
      isSubmitting: false,
      errors: {},
      card: '',
      expiration: '',
      cvv: '',
    };
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  cardPatterns: cardPatterns,

  handleChange: function(e) {
    var errors = this.state.errors;
    // Remove existing API error on value change.
    if (errors.fields && errors.fields[e.target.id]) {
      delete errors.fields[e.target.id];
    }
    this.setState({
      errors: errors,
      [e.target.id]: e.target.value,
    });
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

  updatePattern: function(fieldId, cardType) {
    // Update the pattern for card + cvv field if card was detected.
    if (cardType && this.cardPatterns[cardType]) {
      return utils.defaults(
        this.cardPatterns[cardType][fieldId] || {},
        this.cardPatterns.default[fieldId]
      );
    } else {
      return this.cardPatterns.default[fieldId];
    }
  },

  render: function() {
    var formIsValid = true;
    var { card, expiration, cvv, ...formAttrs } = this.props;

    // Initial Field Props
    var fieldProps = {
      card: card,
      expiration: expiration,
      cvv: cvv,
    };

    var that = this;
    // Iterating over the fieldProps augment the initial
    // props with dynamic updates.
    Object.keys(fieldProps).forEach(function(key) {
      var val = that.stripPlaceholder(that.state[key]);
      var fieldData = fieldProps[key];
      var valData = fieldData.validator(val);
      var cardData = valData.card || {};
      var id = fieldData.id;
      fieldData.type = fieldData.type || 'text';
      fieldData.hasVal = val.length > 0 || false;
      fieldData.isValid = valData.isValid === true;
      fieldData.showError = !valData.isValid && !valData.isPotentiallyValid;
      fieldData.cardType = cardData.type ? cardData.type : null;
      fieldData.onChangeHandler = that.handleChange;

      if (fieldData.showError === true || fieldData.hasVal === false) {
        formIsValid = false;
      }

      // Handle Card Pattern changes.
      // TODO: there's a bug in the InputMask that means
      // pattern changes are no-op.
      var patternData = that.updatePattern(id, fieldData.cardType);
      fieldData.pattern = patternData.pattern;
      fieldData.placeholder = patternData.placeholder;
      fieldData.label = patternData.label || patternData.placeholder;

      // Handle field level API errors.
      if (that.state.errors.fields && that.state.errors.fields[id]) {
        fieldData.isValid = false;
        fieldData.showError = true;
        fieldData.errorMessage = that.state.errors.fields[id][0].message;
        formIsValid = false;
      }
    });

    return (
      <form {...formAttrs} onSubmit={this.handleSubmit}>
        <CardInput {...fieldProps.card} />
        <CardInput {...fieldProps.expiration} />
        <CardInput {...fieldProps.cvv} />
        <SubmitButton isDisabled={!formIsValid}
                      showSpinner={this.state.isSubmitting} />
      </form>
    );
  },
});
