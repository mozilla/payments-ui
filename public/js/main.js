'use strict';

var CardDetails = require('card-details');
var React = require('react');
var $ = require('jquery');
var braintree = require('braintree-web');

var braintreeFormId = 'braintree-form';


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
  $('#braintree-form').on('submit', function(e) {
    e.preventDefault();
    braintree.setup($(this).data('token'), 'custom', {
      id: braintreeFormId,
    });
  });
});
