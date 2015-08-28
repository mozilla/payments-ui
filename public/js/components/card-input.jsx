import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import PayMethodIcon from 'components/pay-method-icon';
import InputError from 'components/input-error';
import MaskedInput from 'react-maskedinput';

import { defaults, gettext } from 'utils';

const cardPatterns = {
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
};


export default class CardInput extends Component {

  static propTypes = {
    attrs: PropTypes.object,
    cardType: PropTypes.string,
    classNames: PropTypes.array,
    errorMessage: PropTypes.string,
    errorModifier: PropTypes.string,
    hasVal: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isValid: PropTypes.bool,
    label: PropTypes.string,
    onChangeHandler: PropTypes.func.isRequired,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    showError: PropTypes.bool,
  }

  updatePattern(fieldId, cardType) {
    // Update the pattern for card + cvv field if card was detected.
    if (cardType && cardPatterns[cardType]) {
      return defaults(
        cardPatterns[cardType][fieldId] || {},
        cardPatterns.default[fieldId]
      );
    } else {
      return cardPatterns.default[fieldId] || {};
    }
  }

  render() {

    var labelClassNames = this.props.classNames || [];
    // Use a copy of the list to avoid appending ad infinitum.
    labelClassNames = labelClassNames.slice(0);
    // Only show invalid classname when invalid and there's a value.
    labelClassNames.push({
      'invalid': (this.props.hasVal || this.props.showError) &&
                  this.props.isValid === false,
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
        { showCardIcon ?
          <PayMethodIcon payMethodType={this.props.cardType} /> : null }
        {pattern ?
          <MaskedInput
            {...this.props.attrs}
            id={this.props.id}
            className={this.props.id + '-input'}
            onChange={this.props.onChangeHandler}
            pattern={pattern}
            placeholder={placeholder}
          /> :
          <input
            {...this.props.attrs}
            id={this.props.id}
            className={this.props.id + '-input'}
            onChange={this.props.onChangeHandler}
            placeholder={placeholder}
          />
        }
      </label>
    );
  }
}
