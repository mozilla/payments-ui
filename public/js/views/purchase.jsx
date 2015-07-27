import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as purchaseActions from 'actions/purchase';

import DefaultCardDetails from 'views/card-details';
import DefaultCardListing from 'views/card-listing';
import DefaultCompletePayment from 'views/complete-payment';


export default class Purchase extends Component {

  static propTypes = {
    CardDetails: PropTypes.object,
    CardListing: PropTypes.object,
    CompletePayment: PropTypes.object,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    CardDetails: DefaultCardDetails,
    CardListing: DefaultCardListing,
    CompletePayment: DefaultCompletePayment,
  }

  selectData(state) {
    return {
      purchase: state.purchase,
    };
  }

  render () {
    var props = this.props;
    var CompletePayment = this.props.CompletePayment;
    var CardListing = this.props.CardListing;
    var CardDetails = this.props.CardDetails;
    return (
      <Connector select={this.selectData}>
        {function(result) {
          if (result.purchase.completed) {
            return (
              <CompletePayment
                productId={props.productId}
                userEmail={props.user.email} />
            );
          } else if (result.purchase.payment_methods.length > 0) {
            console.log('rendering card listing');
            return (
              <CardListing
                productId={props.productId}
                paymentMethods={result.purchase.payment_methods}
                {...bindActionCreators(purchaseActions, result.dispatch)}
              />
            );
          } else {
            console.log('rendering card entry');
            return <CardDetails productId={props.productId} />;
          }
        }}
      </Connector>
    );
  }
}
