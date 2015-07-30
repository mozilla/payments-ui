import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as purchaseActions from 'actions/purchase';
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
      purchase: state.purchase,
      user: state.user,
    };
  }

  renderChild(result) {
    var props = this.props;
    var BraintreeToken = props.BraintreeToken;
    var CompletePayment = props.CompletePayment;
    var CardListing = props.CardListing;
    var AddSubscription = props.AddSubscription;

    if (result.purchase.completed) {
      return (
        <CompletePayment
          productId={props.productId}
          userEmail={props.user.email} />
      );
    } else if (result.purchase.payMethods &&
               result.purchase.payMethods.length > 0) {
      console.log('rendering card listing');
      return (
        <CardListing
          productId={props.productId}
          payMethods={result.user.payMethods}
          {...bindActionCreators(purchaseActions, result.dispatch)}
        />
      );
    } else if (!result.user.braintreeToken) {
      console.log('Retreiving Braintree Token');
      return (
        <BraintreeToken
          {...bindActionCreators(userActions, result.dispatch) }
        />
      );
    } else {
      console.log('rendering card entry');
      var { createSubscription } = bindActionCreators(subscriptionActions,
                                                      result.dispatch);
      return (
        <AddSubscription
          cardSubmissionErrors={result.purchase.cardSubmissionErrors}
          braintreeToken={result.user.braintreeToken}
          createSubscription={createSubscription}
          productId={props.productId}
        />
      );
    }
  }

  render () {
    return (
      <Connector select={this.selectData}>
        {(result) => this.renderChild(result)}
      </Connector>
    );
  }
}
