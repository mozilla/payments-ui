import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as transactionActions from 'actions/transaction';
import * as userActions from 'actions/user';

import DefaultBraintreeToken from 'views/shared/braintree-token';

import DefaultProductPay from 'views/transaction/product-pay';
import DefaultProductPayChooser from 'views/transaction/product-pay-chooser';
import DefaultCompletePayment from 'views/transaction/complete-payment';


export class Transaction extends Component {

  static propTypes = {
    BraintreeToken: PropTypes.func.isRequired,
    CompletePayment: PropTypes.func.isRequired,
    ProductPay: PropTypes.func.isRequired,
    ProductPayChooser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    transaction: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userDefinedAmount: PropTypes.string,
  }

  static defaultProps = {
    BraintreeToken: DefaultBraintreeToken,
    CompletePayment: DefaultCompletePayment,
    ProductPay: DefaultProductPay,
    ProductPayChooser: DefaultProductPayChooser,
  }

  render() {
    var { dispatch, transaction, user, ...props } = this.props;

    var BraintreeToken = props.BraintreeToken;
    var CompletePayment = props.CompletePayment;
    var ProductPayChooser = props.ProductPayChooser;
    var ProductPay = props.ProductPay;
    var { processPayment } = bindActionCreators(transactionActions,
                                                dispatch);
    var userEmail = (transaction.userEmail ?
                     transaction.userEmail : user.email);

    if (transaction.completed) {
      return (
        <CompletePayment
          productId={props.productId}
          userDefinedAmount={props.userDefinedAmount}
          userEmail={userEmail} />
      );
    } else if (transaction.availablePayMethods.length > 0) {
      console.log('rendering card listing');
      return (
        <ProductPayChooser
          processPayment={processPayment}
          productId={props.productId}
          payMethods={transaction.availablePayMethods}
          userDefinedAmount={props.userDefinedAmount}
          {...bindActionCreators(transactionActions, dispatch)}
        />
      );
    } else if (!user.braintreeToken) {
      console.log('Retreiving Braintree Token');
      return (
        <BraintreeToken
          {...bindActionCreators(userActions, dispatch) }
        />
      );
    } else {
      console.log('rendering card entry');
      return (
        <ProductPay
          userDefinedAmount={props.userDefinedAmount}
          cardSubmissionErrors={transaction.cardSubmissionErrors}
          braintreeToken={user.braintreeToken}
          processPayment={processPayment}
          productId={props.productId}
        />
      );
    }
  }
}


function select(state) {
  return {
    transaction: state.transaction,
    user: state.user,
  };
}


export default connect(select)(Transaction);
