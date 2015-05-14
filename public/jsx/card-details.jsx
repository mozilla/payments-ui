var React = require('react');
var MaskedInput = require('react-maskedinput');
var CardValidator = require('card-validator');

module.exports = React.createClass({

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

    this.props.fields.map(function(field, index) {

      var val = that.state[field.id];
      var cardClassName;
      var fieldClass;
      // Operate on a copy of the classNames list.
      var fieldClassNames = field.classNames && field.classNames.slice ? field.classNames.slice(0) : [];

      // Validate the value
      if (val && field.validator) {
        var valData = CardValidator[field.validator](val.replace(/_/g, ''));
        var isValid = valData.isValid === true;
        var maybeValid = valData.isPotentiallyValid !== undefined ? valData.isPotentiallyValid : true;
        if (!isValid) {
          fieldClassNames.push('invalid');
          allValid = false;
        }
        // Handle a card type if detected.
        if (valData.card) {
          var card = valData.card;
          cardClassName = card.type ? 'card-icon cctype-' + (that.cardTypeMap[card.type] || card.type) : '';
        }
      }

      if (fieldClassNames.length) {
        fieldClass = fieldClassNames.join(' ');
      }

      if (val === '') {
        allValid = false;
      }

      var type = field.type || 'text';
      disabled = allValid === false || null;

      fields.push(
        <label htmlFor={field.id} key={field.id}>
          <span className="vh">{field.label ? field.label : field.placeholder}</span>
          { cardClassName ? <span className={cardClassName}></span> : null }
          { field.pattern ?
            (
              <MaskedInput type={type} className={fieldClass}
                           id={field.id} pattern={field.pattern} placeholder={field.placeholder}
                           onChange={that.handleChange.bind(that, index)} />
            ) : (
              <input type={type} className={fieldClass} id={field.id}
                     placeholder={field.placeholder}
                     onChange={that.handleChange.bind(that, index)} />
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
