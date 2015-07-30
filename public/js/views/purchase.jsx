import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as transactionActions from 'actions/transaction';
import * as userActions from 'actions/user';
import * as subscriptionActions from 'actions/subscriptions';

import DefaultAddSubscription from 'views/add-subscription';
import DefaultCardListing from 'views/card-listing';
import DefaultCompletePayment from 'views/complete-payment';
import DefaultBraintreeToken from 'views/braintree-token';


export default class Purchase extends Component {

  static propTypes = {
    AddSubscription: PropTypes.func.isRequired,
    BraintreeToken: PropTypes.func.isRequired,
    CardListing: PropTypes.func.isRequired,
    CompletePayment: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    AddSubscription: DefaultAddSubscription,
    CardListing: DefaultCardListing,
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
    var CardListing = props.CardListing;
    var AddSubscription = props.AddSubscription;

    if (connector.transaction.completed) {
      return (
        <CompletePayment
          productId={props.productId}
          userEmail={props.user.email} />
      );
    } else if (connector.transaction.availablePayMethods.length > 0) {
      console.log('rendering card listing');
      return (
        <CardListing
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
      var { createSubscription } = bindActionCreators(subscriptionActions,
                                                      connector.dispatch);
      return (
        <AddSubscription
          cardSubmissionErrors={connector.transaction.cardSubmissionErrors}
          braintreeToken={connector.user.braintreeToken}
          createSubscription={createSubscription}
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
