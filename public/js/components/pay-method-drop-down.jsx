import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import PayMethodIcon from 'components/pay-method-icon';
import { gettext } from 'utils';

const defaultSelectText = gettext('Please select');


export default class PayMethodDropDown extends Component {

  static propTypes = {
    cssModifier: PropTypes.string,
    onPayMethodChange: PropTypes.func.isRequired,
    payMethods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
      })
    ).isRequired,
    selectedPayMethodResource: PropTypes.string,
    showDefaultOption: PropTypes.bool,
  }

  static defaultProps = {
    showDefaultOption: true,
  }

  constructor(props) {
    super(props);
    var payMethodData;
    // Get the data for the default selected pay method.
    if (props.selectedPayMethodResource) {
      payMethodData = this.getSelectedPayMethod(
        props.selectedPayMethodResource);
    }

    // If there's default selected option and showDefaultOption is false
    // we set the "fake select" to the first option.
    if (!payMethodData && !props.showDefaultOption) {
      payMethodData = props.payMethods[0];
    }

    var initialState = {
      selectedText: defaultSelectText,
      selectedPayMethodType: null,
      isFocused: false,
    };

    var displayData = {};
    if (payMethodData) {
      displayData = this.getDisplayData(payMethodData);
    }

    this.state = Object.assign({}, initialState, displayData);
  }

  getSelectedPayMethod(selectedPayMethodResource) {
    var selectedPayMethod = this.props.payMethods.filter(
      item => item.resource_uri === selectedPayMethodResource);
    if (selectedPayMethod.length) {
      return selectedPayMethod[0];
    } else {
      return {};
    }
  }

  handleFocus = () => {
    this.setState({isFocused: true});
  }

  handleBlur = () => {
    this.setState({isFocused: false});
  }

  // Returns an object with the necessary data
  // to use in setState.
  getDisplayData(payMethod) {
    if (payMethod.type_name && payMethod.truncated_id) {
      return {
        selectedPayMethodType: payMethod.type_name.toLowerCase(),
        selectedText: '●●●● ●●●● ●●●● ' + payMethod.truncated_id,
      };
    } else {
      return {
        selectedPayMethodType: null,
        selectedText: defaultSelectText,
      };
    }
  }

  updatePayMethodSelection(selectedPayMethodResource) {
    var payMethodData = this.getSelectedPayMethod(selectedPayMethodResource);
    this.setState(this.getDisplayData(payMethodData));
  }

  handleChange = e => {
    if (this.props.onPayMethodChange) {
      this.props.onPayMethodChange(e);
    }
    this.updatePayMethodSelection(e.target.value);
  }

  render() {
    var payMethods = this.props.payMethods;
    var payMethodOptions = [];

    if (this.props.showDefaultOption === true) {
      payMethodOptions.push((
        <option
          value=""
          key="_default"
          ref="_default">{defaultSelectText}</option>
      ));
    }

    for (var i = 0; i < payMethods.length; i += 1) {
      var payMethod = payMethods[i];
      var optionText = payMethod.type_name.toUpperCase() +
        ' ●●●● ●●●● ●●●● ' + payMethod.truncated_id;

      var selected = (payMethod.resource_uri ===
        this.props.selectedPayMethodResource) ? 'selected' : null;

      payMethodOptions.push(
        <option
          key={payMethod.id}
          selected={selected}
          value={payMethod.resource_uri}
        >{optionText}</option>
      );
    }

    var contentClasses = cx('content', {
      'has-pay-method': this.state.selectedPayMethodType,
    });

    var proxySelectClasses = cx('proxy-select', {
      'active': this.state.isFocused,
    });

    return (
      <div className={proxySelectClasses}>
        {this.state.selectedPayMethodType ?
         <PayMethodIcon payMethodType={this.state.selectedPayMethodType} /> :
         null}
        <span className={contentClasses} ariaHidden="true">
          <span className="vh">{this.state.selectedPayMethodType}</span>
          {this.state.selectedText}
        </span>
        <select
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleChange}>
          {payMethodOptions}
        </select>
      </div>
    );
  }
}
