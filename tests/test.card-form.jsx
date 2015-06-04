'use strict';


var CardForm = require('components/card-form');

var helpers = require('./helpers');

var React;
var TestUtils;
var findByClass;

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
    findByClass = function(component, className){
      return TestUtils.findRenderedDOMComponentWithClass(component, className);
    };
  });

  function testCard(cardType) {
    return function() {
      cardForm.handleChange({
        target: {
          value: helpers.testCards[cardType],
          id: 'card',
        },
      });
      var cardIcon = findByClass(cardForm, 'card-icon');
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
