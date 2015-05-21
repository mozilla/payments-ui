'use strict';

var $ = require('jquery');
var braintree = require('braintree-web');
var CardDetails = require('card-details');
var queryString = require('query-string');
var React = require('react');


var braintreeFormId = 'braintree-form';
var qs = queryString.parse(window.location.search);


$.ajax({
  data: {
    'access_token': qs.access_token,
  },
  method: 'post',
  url: '/api/auth/sign-in/',
  dataType: 'json',
}).then(function(authData) {

  console.log('successfully logged in ', authData.buyer_uuid);

  $.ajax({
    data: {},
    method: 'post',
    url: '/api/braintree/token/generate/',
    dataType: 'json',
  }).then(function(data) {
    var root = React.createElement(CardDetails, {
      // All of these just end up as HTML attrs on our form.
      'data-token': data.token,
      'id': braintreeFormId,
      'method': 'post',
      // TODO update this with a real endpoint.
      'action': '/braintree/',
    });

    React.render(root, document.getElementById('view'));

    // TODO Move this into card-details.
    braintree.setup(data.token, 'custom', {
      id: braintreeFormId,
      onPaymentMethodReceived: function(payment) {
        console.log('received nonce:', payment.nonce);
        console.log('received payment:', payment);
        $.ajax({
          data: {
            pay_method_nonce: payment.nonce,
            plan_id: 'mozilla-concrete-brick',
          },
          url: '/api/braintree/subscriptions/',
          method: 'post',
          dataType: 'json',
        }).then(function(subscribeData) {
          console.log('successfully subscribed?', subscribeData);
        });
      },
    });

    $('#braintree-form').on('submit', function(e) {
      console.log('form submitted');
      e.preventDefault();
    });
  });

});
