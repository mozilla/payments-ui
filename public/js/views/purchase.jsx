'use strict';

var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var Connector = require('redux/react').Connector;

var CardDetails = require('views/card-details');
var CardListing = require('views/card-listing');
var CompletePayment = require('views/complete-payment');
var purchaseActions = require('actions/purchase');


module.exports = React.createClass({

  displayName: 'Purchase',

  propTypes: {
    productId: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired,
  },

  selectData: function(state) {
    return {
      purchase: state.purchase,
    };
  },

  render () {
    var props = this.props;
    return (
      <Connector select={this.selectData}>
        {function(result) {
          if (result.purchase.completed) {
            return (
              <CompletePayment productId={props.productId}
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
  },
});
