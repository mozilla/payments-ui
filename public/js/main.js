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
    $('#braintree-form').on('submit', function(e) {
      e.preventDefault();
      braintree.setup($(this).data('token'), 'custom', {
        id: braintreeFormId,
      });
    });
  });

});
