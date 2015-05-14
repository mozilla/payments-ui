var React = require('react');
var MaskedInput = require('react-maskedinput');
var CardValidator = require('card-validator');

module.exports = React.createClass({

  getInitialState: function() {
    return {
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
    this.props.fields.map(function(field, index) {

      var val = that.state[field.id];
      var cardClassName;
      var fieldClass;

      // Validate the value
      if (val) {
        var valData = CardValidator[field.validator](val.replace(/_/g, ''));
        var isValid = valData.isValid === true;
        var maybeValid = valData.isPotentiallyValid !== undefined ? valData.isPotentiallyValid : true;
        fieldClass = !isValid && !maybeValid ? 'invalid' : null;

        // Handle a card type if detected.
        if (valData.card) {
          var card = valData.card;
          cardClassName = card.type ? 'card-icon cctype-' + (that.cardTypeMap[card.type] || card.type) : '';
        }
      }

      fields.push(
        <label htmlFor={field.id} key={field.id}>
          <span className="vh">{field.label ? field.label : field.placeholder}</span>
          { cardClassName ? <span className={cardClassName}></span> : null }
          <MaskedInput className={fieldClass} id={field.id} pattern={field.pattern}
                       placeholder={field.placeholder} onChange={that.handleChange.bind(that, index)} />
        </label>
      );
    });

    return (
      <form>
        {fields}
      </form>
    );
  }
});
