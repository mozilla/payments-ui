import React, { Component, PropTypes } from 'react';
import PayMethodIcon from 'components/pay-method-icon';


export default class PayMethodItem extends Component {

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    inputType: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    payMethod: PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
    }),
  }

  static defaultProps = {
    inputType: 'radio',
  }

  render() {
    var payMethod = this.props.payMethod;
    var payMethodType = payMethod.type_name.toLowerCase();
    var payMethodText = '●●●● ●●●● ●●●● ' + payMethod.truncated_id;
    var inputId = 'paymethod-' + payMethod.id;

    return (
      <div className="pay-method-item">
        <PayMethodIcon payMethodType={payMethodType} />
        <input
          checked={this.props.inputType === 'radio' ? this.props.checked : null}
          id={inputId}
          name="paymethod"
          onChange={this.props.onChangeHandler}
          type={this.props.inputType}
          value={payMethod.resource_uri}
        />
        <label htmlFor={inputId} className="text">{payMethodText}</label>
      </div>
    );
  }
}
