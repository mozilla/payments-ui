'use strict';

var React = require('react');
var MaskedInput = require('react-maskedinput');
var CardValidator = require('card-validator');

var utils = require('utils');

module.exports = React.createClass({

  displayName: 'CardForm',

  propTypes: {
    fields: React.PropTypes.array.isRequired,
  },

  getDefaultProps: function() {
    return {
      fields: [
        {
          'data-braintree-name': 'cardholder_name',
          'id': 'cardholder',
          'placeholder': 'Card holder name',
        }, {
          'data-braintree-name': 'number',
          'id': 'card',
          'ref': 'card',
          'type': 'tel',
          'validator': 'number',
        }, {
          'classNames': ['expiration'],
          'data-braintree-name': 'expiration_date',
          'id': 'expiration',
          'type': 'tel',
          'validator': 'expirationDate',
        }, {
          'classNames': ['cvv'],
          'data-braintree-name': 'cvv',
          'id': 'cvv',
          'type': 'tel',
          'validator': 'cvv',
        },
      ],
    };
  },

  getInitialState: function() {
    return {
      cardholder: '',
      card: '',
      expiration: '',
      cvv: '',
    };
  },

  cardPatterns: {
    'default': {
      number: {
        pattern: '1111 1111 1111 1111',
        placeholder: 'Card number',
      },
      cvv: {
        pattern: '111',
        placeholder: 'CVV',
      },
      expirationDate: {
        label: 'Expiry Date',
        pattern: '11/11',
        placeholder: 'MM/YY',
      },
    },
    'american-express': {
      number: {
        pattern: '1111 111111 11111',
      },
      cvv: {
        pattern: '1111',
        placeholder: 'CID',
      },
    },
    'diners-club': {
      number: {
        pattern: '1111 111111 1111',
      },
      cvv: {
        pattern: '111',
        placeholder: 'CVV',
      },
    },
  },


  handleChange: function(index, e) {
    var stateChange = {};
    var val = e.target.value;
    stateChange[e.target.id] = val;
    this.setState(stateChange);
  },

  // Just a convenience mapping for cards from card-validator
  // to shorted classes used in CSS.
  cardTypeMap: {
    'american-express': 'amex',
    'diners-club': 'diners',
    'master-card': 'mastercard',
  },

  render: function() {
    var fieldList = [];
    var that = this;
    var allValid = true;
    var disabled;
    var detectedCard = null;

    var { fields, ...formAttrs } = this.props;

    fields.map(function(field, index) {
      // This uses ES7 'destructuring assignments' to
      // pass every key *not* starting with '...' to
      // vars and the remaining key value pairs are left
      // to be passed into the element with {...attrs}
      // helps a lot to DRY things up.
      var { label, placeholder, validator,
            classNames, pattern, ...attrs } = field;

      var val = that.state[field.id];
      var cardClassName;
      var fieldClass;
      // Operate on a copy of the classNames list.
      var fieldClassNames = classNames &&
        classNames.slice ? classNames.slice(0) : [];

      // Validate the value
      if (val && validator) {
        // We strip out the '_' added to the value by react-masked-input.
        var valData = CardValidator[validator](val.replace(/_/g, ''));
        var isValid = valData.isValid === true;

        if (!isValid) {
          fieldClassNames.push('invalid');
          allValid = false;
        }

        // Handle a card type if detected.
        // This results in an icon to be rendered when the card is detected.
        if (valData.card) {
          var card = valData.card;
          detectedCard = card.type;
          cardClassName = card.type ? 'card-icon cctype-' +
                            (that.cardTypeMap[card.type] || card.type) : '';
        }
      }

      if (validator) {
        // Update the pattern for card + cvv field if card was detected.
        var cardData = that.cardPatterns.default[validator];
        if (detectedCard && that.cardPatterns[detectedCard]) {
           cardData = utils.defaults(
                        that.cardPatterns[detectedCard][validator], cardData);
        }
        pattern = cardData.pattern;
        placeholder = cardData.placeholder;
        label = cardData.label || cardData.placeholder;
      }

      // For non card-validator fields provide a fallback for label;
      if (!validator) {
        label = field.label || field.placeholder;
      }

      if (fieldClassNames.length) {
        fieldClass = fieldClassNames.join(' ');
      }

      // We're assuming all fields are required.
      // so we need to mark the form as invalid
      // if the value of this field is an empty string.
      // TODO: consider using the required attr.
      if (val === '') {
        allValid = false;
      }

      var type = field.type || 'text';
      disabled = allValid === false || null;

      fieldList.push(
        <label htmlFor={field.id} key={field.id}>
          <span className="vh">{label}</span>
          { cardClassName ? <span className={cardClassName}
                                  ref="card-icon" /> : null }
          { pattern ?
            <MaskedInput {...attrs}
                         className={fieldClass}
                         onChange={that.handleChange.bind(that, index)}
                         pattern={pattern}
                         placeholder={placeholder}
                         type={type}
            /> : <input {...attrs}
                        className={fieldClass}
                        onChange={that.handleChange.bind(that, index)}
                        placeholder={placeholder}
                        type={type}
            />
          }
        </label>
      );
    });

    return (
      <form {...formAttrs} >
        {fieldList}
        <button disabled={disabled} type="submit">Subscribe</button>
      </form>
    );
  },
});
