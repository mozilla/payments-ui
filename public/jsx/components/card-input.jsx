'use strict';

var classNames = require('classnames');
var React = require('react');

var CardIcon = require('components/card-icon');
var InputError = require('components/input-error');
var MaskedInput = require('react-maskedinput');

var utils = require('utils');
var gettext = utils.gettext;


var CardInput = React.createClass({

  displayName: 'CardInput',

  propTypes: {
    cardType: React.PropTypes.string,
    classNames: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    errorModifier: React.PropTypes.string,
    hasVal: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    isValid: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChangeHandler: React.PropTypes.func.isRequired,
    pattern: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    showError: React.PropTypes.bool,
    type: React.PropTypes.string.isRequired,
  },

  cardPatterns: {
    'default': {
      card: {
        pattern: '1111 1111 1111 1111',
      },
      cvv: {
        pattern: '111',
        placeholder: gettext('CVV'),
      },
    },
    'american-express': {
      card: {
        pattern: '1111 111111 11111',
      },
      cvv: {
        pattern: '1111',
        placeholder: gettext('CID'),
      },
    },
    'diners-club': {
      card: {
        pattern: '1111 111111 1111',
      },
      cvv: {
        pattern: '111',
        placeholder: gettext('CVV'),
      },
    },
  },

  updatePattern: function(fieldId, cardType) {
    // Update the pattern for card + cvv field if card was detected.
    if (cardType && this.cardPatterns[cardType]) {
      return utils.defaults(
        this.cardPatterns[cardType][fieldId] || {},
        this.cardPatterns.default[fieldId]
      );
    } else {
      return this.cardPatterns.default[fieldId] || {};
    }
  },

  render: function() {

    var labelClassNames = this.props.classNames || [];
    // Use a copy of the list to avoid appending ad infinitum.
    labelClassNames = labelClassNames.slice(0);
    // Only show invalid classname when invalid and there's a value.
    labelClassNames.push({
      'invalid': this.props.hasVal && this.props.isValid === false,
    });
    var labelClass = classNames(labelClassNames);

    // Work out the pattern / placeholder based on the card type.
    // Note: Due to a bug in InputMask the pattern updates are no-op.
    var patternData = this.updatePattern(this.props.id, this.props.cardType);
    var pattern = patternData.pattern || this.props.pattern;
    var placeholder = patternData.placeholder || this.props.placeholder;
    var label = patternData.label || patternData.placeholder ||
                this.props.label || this.props.pattern;

    var showCardIcon = this.props.id === 'card';

    return (
      <label className={labelClass} htmlFor={this.props.id} >
        <span className="vh">{label}</span>
        { this.props.showError ?
          <InputError errorMessage={this.props.errorMessage}
                      errorModifier={this.props.errorModifier} /> : null }
        { showCardIcon ? <CardIcon cardType={this.props.cardType} /> : null }
        <MaskedInput
          id={this.props.id}
          className={this.props.id + '-input'}
          type={this.props.type}
          onChange={this.props.onChangeHandler}
          pattern={pattern}
          placeholder={placeholder}
        />
      </label>
    );
  },
});

module.exports = CardInput;
