import React, { Component, PropTypes } from 'react';

import PayMethodList from 'components/pay-method-list';
import SubmitButton from 'components/submit-button';

import { gettext } from 'utils';


export default class PayMethodChoice extends Component {

  static propTypes = {
    cssModifier: PropTypes.string,
    payMethods: PropTypes.array.isRequired,
    productId: PropTypes.string.isRequired,
    submitButtonCSSModifier: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    cssModifier: null,
    submitButtonText: gettext('Submit'),
    submitButtonModifier: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      payMethod: (this.props.payMethods.length === 1 ?
                  this.props.payMethods[0].resource_uri : null),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmitting: true});
    this.props.submitHandler(this.state.payMethod);
  }

  handlePayMethodChange = (e) => {
    this.setState({payMethod: e.target.value});
  }

  render() {
    var payMethodData = this.props.payMethods;
    for (var i = 0; i < payMethodData.length; i += 1) {
      var payMethod = payMethodData[i];
      payMethod.checked = this.state.payMethod === payMethod.resource_uri;
    }

    var formIsValid = this.state.payMethod !== null;

    return (
      <form id="pay-method-choice" onSubmit={this.handleSubmit}>
        <PayMethodList
          cssModifier={this.props.cssModifier}
          payMethods={payMethodData}
          onPayMethodChange={this.handlePayMethodChange} />
        <SubmitButton isDisabled={!formIsValid}
          cssModifier={this.props.submitButtonCSSModifier}
          showSpinner={this.state.isSubmitting}
          text={this.props.submitButtonText}
        />
      </form>
    );
  }
}
