import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';

import * as purchaseActions from 'actions/purchase';

import CardDetails from 'views/card-details';
import CardListing from 'views/card-listing';
import CompletePayment from 'views/complete-payment';


export default class Purchase extends Component {

  static propTypes = {
    CardDetails: PropTypes.object,
    CardListing: PropTypes.object,
    CompletePayment: PropTypes.object,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    CardDetails: CardDetails,
    CardListing: CardListing,
    CompletePayment: CompletePayment,
  }

  selectData(state) {
    return {
      purchase: state.purchase,
    };
  }

  render () {
    var props = this.props;
    var CompletePayment_ = this.props.CompletePayment;
    var CardListing_ = this.props.CardListing;
    var CardDetails_ = this.props.CardDetails;
    return (
      <Connector select={this.selectData}>
        {function(result) {
          if (result.purchase.completed) {
            return (
              <CompletePayment_
                productId={props.productId}
                userEmail={props.user.email} />
            );
          } else if (result.purchase.payment_methods.length > 0) {
            console.log('rendering card listing');
            return (
              <CardListing_
                productId={props.productId}
                paymentMethods={result.purchase.payment_methods}
                {...bindActionCreators(purchaseActions, result.dispatch)}
              />
            );
          } else {
            console.log('rendering card entry');
            return <CardDetails_ productId={props.productId} />;
          }
        }}
      </Connector>
    );
  }
}
