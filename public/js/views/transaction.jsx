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
    amount: PropTypes.string,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
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

    if (connector.transaction.completed) {
      return (
        <CompletePayment
          amount={props.amount}
          productId={props.productId}
          userEmail={props.user.email} />
      );
    } else if (connector.transaction.availablePayMethods.length > 0) {
      console.log('rendering card listing');
      return (
        <ProductPayChooser
          amount={props.amount}
          processPayment={processPayment}
          productId={props.productId}
          payMethods={connector.transaction.availablePayMethods}
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
          amount={props.amount}
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
