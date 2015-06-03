'use strict';

var classNames = require('classnames');
var React = require('react');

var CardIcon = require('components/card-icon');
var InputError = require('components/input-error');
var MaskedInput = require('react-maskedinput');


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
    label: React.PropTypes.string.isRequired,
    onChangeHandler: React.PropTypes.func.isRequired,
    pattern: React.PropTypes.string,
    placeholder: React.PropTypes.string.isRequired,
    showError: React.PropTypes.bool,
    type: React.PropTypes.string.isRequired,
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

    return (
      <label className={labelClass} htmlFor={this.props.id} >
        <span className="vh">{this.props.label}</span>
        { this.props.showError ?
          <InputError errorMessage={this.props.errorMessage}
                      errorModifier={this.props.errorModifier} /> : null }
        <CardIcon cardType={this.props.cardType} />
        <MaskedInput
          id={this.props.id}
          type={this.props.type}
          onChange={this.props.onChangeHandler}
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
        />
      </label>
    );
  },
});

module.exports = CardInput;
