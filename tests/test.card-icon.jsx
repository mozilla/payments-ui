'use strict';


var CardIcon = require('components/card-icon');

var helpers = require('./helpers');

var React;
var TestUtils;


describe('Card Icon', function() {

  var cardIcon;
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
    cardIcon = TestUtils.renderIntoDocument(
      <CardIcon cardType="amex" />
    );
  });

  function testCard(cardType) {
    return function() {
      cardIcon.setProps({'cardType': cardType});
      var cardIconNode = cardIcon.getDOMNode();
      assert.include(
        cardIconNode.getAttribute('class'), 'cctype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('sets card class to: ' + card, testCard(card));
  });

});
