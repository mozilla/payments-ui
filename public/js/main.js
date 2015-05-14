var CardDetails = require('card-details');
var React = require('react');

// The core field props passed into <CardDetails>
var fields = [
  {
    id: 'cardholder',
    placeholder: 'Card holder name',
  }, {
    id: 'card',
    inputmode: 'numeric',
    pattern:  '1111 1111 1111 1111',
    placeholder: 'Card number',
    type: 'tel',
    validator: 'number',
  }, {
    classNames: ['expiration'],
    id: 'expiration',
    inputmode: 'numeric',
    label: 'Expiry Date',
    pattern: '11/11',
    placeholder: 'MM/YY',
    type: 'tel',
    validator: 'expirationDate',
  }, {
    classNames: ['cvv'],
    id: 'cvv',
    inputmode: 'numeric',
    pattern: '111',
    placeholder: 'CVV',
    type: 'tel',
    validator: 'cvv',
  }
];

var root = React.createElement(CardDetails, {fields: fields});
React.render(root, document.getElementById('view'));
