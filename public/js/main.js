var CardDetails = require('card-details');
var React = require('react');

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

var root = React.createElement(CardDetails, {fields: fields});
React.render(root, document.getElementById('view'));
