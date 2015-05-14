var CardDetails = require('card-details');
var React = require('react');

// The core field props passed into <CardDetails>
var fields = [
  {
    placeholder: 'Credit Card',
    pattern:  '1111 1111 1111 1111',
    validator: 'number',
    id: 'card',
  }, {
    label: 'Expiry Date',
    placeholder: 'MM/YY',
    pattern: '11/11',
    validator: 'expirationDate',
    id: 'expiration',
  }, {
    placeholder: 'CVV',
    pattern: '111',
    validator: 'cvv',
    id: 'cvv',
  }
];

var root = React.createElement(CardDetails, {fields: fields});
React.render(root, document.getElementById('view'));
