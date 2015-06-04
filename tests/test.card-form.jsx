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

  it('shows a card error on invalid input', function() {
    cardForm.handleChange({
      target: {
        value: helpers.testCards.invalidVisa,
        id: 'card',
      },
    });
    var card = findByClass(cardForm, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = findByClass(card, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

  it('shows a expiration error on invalid input', function() {
    cardForm.handleChange({
      target: {
        value: '13/__',
        id: 'expiration',
      },
    });
    var expiration = findByClass(cardForm, 'expiration');
    assert.include(expiration.props.className, 'invalid');
    var expirationError = findByClass(expiration, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(expirationError));
  });

  it('shows a cvv message on an api error', function() {
    cardForm.processApiErrors(helpers.cvvError);
    var cvv = findByClass(cardForm, 'cvv');
    assert.include(cvv.props.className, 'invalid');
    var cvvError = findByClass(cvv, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cvvError));
  });

  it('shows a card declined message', function() {
    cardForm.processApiErrors(helpers.declinedError);
    var card = findByClass(cardForm, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = findByClass(card, 'tooltip');
    assert.include(cardError.props.children, 'declined');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

});
