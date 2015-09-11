import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import PayMethodList from 'components/pay-method-list';
import PayMethodDropDown from 'components/pay-method-drop-down';
import SubmitButton from 'components/submit-button';

import { getId, gettext } from 'utils';


export class PayMethodChoice extends Component {

  static propTypes = {
    cssModifier: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    processing: PropTypes.object.isRequired,
    productId: PropTypes.string.isRequired,
    submitButtonCSSModifier: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    useDropDown: PropTypes.bool,
  }

  static defaultProps = {
    cssModifier: null,
    submitButtonText: gettext('Submit'),
    submitButtonModifier: null,
    useDropDown: false,
  }

  constructor(props) {
    super(props);
    this.processingId = getId({prefix: 'PayMethodChoice'});

    var payMethodUri = null;
    if (this.props.useDropDown) {
      // TODO: Once a default pay method is possible this will need
      // to be updated.
      payMethodUri = this.props.payMethods[0].resource_uri;
    } else {
      payMethodUri = this.props.payMethods.length === 1 ?
        this.props.payMethods[0].resource_uri : null;
    }

    this.state = {
      payMethod: payMethodUri,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitHandler(this.state.payMethod, this.processingId);
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
        {this.props.useDropDown === true ?
          <PayMethodDropDown
           onPayMethodChange={this.handlePayMethodChange}
           payMethods={payMethodData}
           showDefaultOption={false}
          /> :
          <PayMethodList
            cssModifier={this.props.cssModifier}
            payMethods={payMethodData}
            onPayMethodChange={this.handlePayMethodChange}
          />
        }
        <SubmitButton isDisabled={!formIsValid}
          cssModifier={this.props.submitButtonCSSModifier}
          showSpinner={this.props.processing[this.processingId]}
          content={this.props.submitButtonText}
        />
      </form>
    );
  }
}


function select(state) {
  return {
    processing: state.processing,
  };
}


export default connect(select)(PayMethodChoice);
