var React = require('react');
var MaskedInput = require('react-maskedinput');
var CardValidator = require('card-validator');

var utils = require('utils');

module.exports = React.createClass({

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
      }
    },
    'american-express': {
      number: {
        pattern: '1111 111111 11111',
      },
      cvv: {
        pattern: '1111',
        placeholder: 'CID',
      }
    },
    'diners-club': {
      number: {
        pattern: '1111 111111 1111',
      },
      cvv: {
        pattern: '111',
        placeholder: 'CVV',
      }
    },
  },

  getInitialState: function() {
    return {
      cardholder: '',
      card: '',
      expiration: '',
      cvv: ''
    };
  },

  handleChange: function(index, e) {
    var stateChange = {};
    var val = e.target.value;
    stateChange[e.target.id] = val;
    this.setState(stateChange);
  },

  // Just a convenience mapping for cards from card-validator
  // to shorted classes used in CSS.
  cardTypeMap:  {
    'american-express': 'amex',
    'diners-club': 'diners',
    'master-card': 'mastercard',
  },

  render: function() {
    var fields = [];
    var that = this;
    var allValid = true;
    var disabled;
    var detectedCard = null;

    this.props.fields.map(function(field, index) {
      // This uses ES7 'destructuring assignments' to
      // pass every key *not* starting with '...' to
      // vars and the remaining key value pairs are left
      // to be passed into the element with {...attrs}
      // helps a lot to DRY things up.
      var { label, placeholder, validator, classNames, pattern, ...attrs } = field;

      var val = that.state[field.id];
      var cardClassName;
      var fieldClass;
      // Operate on a copy of the classNames list.
      var fieldClassNames = classNames && classNames.slice ? classNames.slice(0) : [];

      // Validate the value
      if (val && validator) {
        // We strip out the '_' added to the value by react-masked-input.
        var valData = CardValidator[validator](val.replace(/_/g, ''));
        var isValid = valData.isValid === true;
        var maybeValid = valData.isPotentiallyValid !== undefined ? valData.isPotentiallyValid : true;

        if (!isValid) {
          fieldClassNames.push('invalid');
          allValid = false;
        }

        // Handle a card type if detected.
        // This results in an icon to be rendered when the card is detected.
        if (valData.card) {
          var card = valData.card;
          detectedCard = card.type;
          cardClassName = card.type ? 'card-icon cctype-' + (that.cardTypeMap[card.type] || card.type) : '';
        }
      }

      if (validator) {
        // Update the pattern for card + cvv field if card was detected.
        var cardData = that.cardPatterns.default[validator];
        if (detectedCard && that.cardPatterns[detectedCard]) {
           cardData = utils.defaults(that.cardPatterns[detectedCard][validator], cardData);
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

      fields.push(
        <label htmlFor={field.id} key={field.id}>
          <span className="vh">{label}</span>
          { cardClassName ? <span className={cardClassName}></span> : null }
          { pattern ?
            (
              <MaskedInput {...attrs}
                           className={fieldClass}
                           pattern={pattern}
                           placeholder={placeholder}
                           type={type}
                           onChange={that.handleChange.bind(that, index)}
              />
            ) : (
              <input {...attrs}
                     className={fieldClass}
                     onChange={that.handleChange.bind(that, index)}
                     placeholder={placeholder}
                     type={type}
              />
            )
          }
        </label>
      );
    });

    return (
      <form>
        {fields}
        <button disabled={disabled} type="submit">Subscribe</button>
      </form>
    );
  }
});
