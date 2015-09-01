import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as transactionActions from 'actions/transaction';
import * as userActions from 'actions/user';

import DefaultBraintreeToken from 'views/shared/braintree-token';

import DefaultProductPay from 'views/transaction/product-pay';
import DefaultProductPayChooser from 'views/transaction/product-pay-chooser';
import DefaultCompletePayment from 'views/transaction/complete-payment';


export default class Transaction extends Component {

  static propTypes = {
    BraintreeToken: PropTypes.func.isRequired,
    CompletePayment: PropTypes.func.isRequired,
    ProductPay: PropTypes.func.isRequired,
    ProductPayChooser: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userDefinedAmount: PropTypes.string,
  }

  static defaultProps = {
    ProductPay: DefaultProductPay,
    ProductPayChooser: DefaultProductPayChooser,
    CompletePayment: DefaultCompletePayment,
    BraintreeToken: DefaultBraintreeToken,
  }

  selectData(state) {
    return {
      transaction: state.transaction,
      user: state.user,
    };
  }

  renderChild(connector) {
    var props = this.props;
    var BraintreeToken = props.BraintreeToken;
    var CompletePayment = props.CompletePayment;
    var ProductPayChooser = props.ProductPayChooser;
    var ProductPay = props.ProductPay;
    var { processPayment } = bindActionCreators(transactionActions,
                                                connector.dispatch);
    var userEmail = (connector.transaction.userEmail ?
                     connector.transaction.userEmail : props.user.email);

    if (connector.transaction.completed) {
      return (
        <CompletePayment
          productId={props.productId}
          userDefinedAmount={props.userDefinedAmount}
          userEmail={userEmail} />
      );
    } else if (connector.transaction.availablePayMethods.length > 0) {
      console.log('rendering card listing');
      return (
        <ProductPayChooser
          processPayment={processPayment}
          productId={props.productId}
          payMethods={connector.transaction.availablePayMethods}
          userDefinedAmount={props.userDefinedAmount}
          {...bindActionCreators(transactionActions, connector.dispatch)}
        />
      );
    } else if (!connector.user.braintreeToken) {
      console.log('Retreiving Braintree Token');
      return (
        <BraintreeToken
          {...bindActionCreators(userActions, connector.dispatch) }
        />
      );
    } else {
      console.log('rendering card entry');
      return (
        <ProductPay
          userDefinedAmount={props.userDefinedAmount}
          cardSubmissionErrors={connector.transaction.cardSubmissionErrors}
          braintreeToken={connector.user.braintreeToken}
          processPayment={processPayment}
          productId={props.productId}
        />
      );
    }
  }

  render () {
    return (
      <Connector select={this.selectData}>
        {(connector) => this.renderChild(connector)}
      </Connector>
    );
  }
}
