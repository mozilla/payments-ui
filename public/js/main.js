var CardDetails = require('card-details');
var React = require('react');
var $ = require('jquery');
var braintree = require('braintree-web');

// The core field props passed into <CardDetails>
var fields = [
  {
    'data-braintree-name': 'cardholder_name',
    'id': 'cardholder',
    'placeholder': 'Card holder name',
  }, {
    'data-braintree-name': 'number',
    'id': 'card',
    'type': 'tel',
    'validator': 'number',
  }, {
    'classNames': ['expiration'],
    'data-braintree-name': 'expiration_date',
    'id': 'expiration',
    'type': 'tel',
    'validator': 'expirationDate',
  }, {
    'classNames': ['cvv'],
    'data-braintree-name': 'cvv',
    'id': 'cvv',
    'type': 'tel',
    'validator': 'cvv',
  }
];

var braintreeFormId = 'braintree-form';

var token = $.ajax({
  data: {},
  method: 'post',
  url: '/api/braintree/token/generate/',
  dataType: 'json',
}).then(function(data) {

  var root = React.createElement(CardDetails, {
    // The field data for building up the form
    // in react.
    fields: fields,
    // All of these just end up as HTML attrs on our form.
    'data-token': data.token,
    'id': braintreeFormId,
    'method': 'post',
    // TODO update this with a real endpoint.
    'action': '/braintree/',
  });

  React.render(root, document.getElementById('view'));

  $('#braintree-form').on('submit', function(e) {
    e.preventDefault();
    braintree.setup($(this).data('token'), 'custom', {
      id: braintreeFormId
    });
  });

});
