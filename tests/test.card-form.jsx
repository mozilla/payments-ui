'use strict';


var CardForm = require('components/card-form');

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
    cardForm = TestUtils.renderIntoDocument(
      <CardForm data-token="whatever" id="something"/>
    );
  });

  function testCard(cardType) {
    return function() {
      cardForm.setState({'card': helpers.testCards[cardType]});
      var cardIcon = TestUtils.findRenderedDOMComponentWithClass(
        cardForm, 'card-icon');
      assert.include(cardIcon.props.className, 'cctype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('Detects ' + card, testCard(card));
  });

  it('renders a token', function() {
    var formNode = cardForm.getDOMNode();
    assert.equal(formNode.getAttribute('data-token'), 'whatever');
  });

  it('renders an id', function() {
    var formNode = cardForm.getDOMNode();
    assert.equal(formNode.getAttribute('id'), 'something');
  });

});
