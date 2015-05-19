'use strict';


var CardDetails = require('card-details');

var helpers = require('./helpers');

var React;
var TestUtils;

describe('Card Details', function() {

  var cardForm;
  var cards = [
    'amex',
    'discover',
    'jcb',
    'maestro',
    'mastercard',
    'visa',
  ];

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    cardForm = TestUtils.renderIntoDocument(<CardDetails />);
  });

  function testCard(cardType) {
    return function() {
      cardForm.setState({'card': helpers.testCards[cardType]});
      var cardIcon = React.findDOMNode(cardForm.refs['card-icon']);
      assert.include(cardIcon.className, 'cctype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('Detects ' + card, testCard(card));
  });

});
