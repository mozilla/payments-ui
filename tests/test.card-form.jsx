'use strict';


var CardForm = require('components/card-form');

var helpers = require('./helpers');

var React;
var TestUtils;

describe('Card Details', function() {

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
    this.CardForm = TestUtils.renderIntoDocument(
      <CardForm data-token="whatever" id="something"/>
    );
  });

  function testCard(cardType) {
    return function() {
      this.CardForm.handleChange({
        target: {
          value: helpers.testCards[cardType],
          id: 'card',
        },
      });
      var cardIcon = helpers.findByClass(this.CardForm, 'card-icon');
      assert.include(cardIcon.props.className, 'cctype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('Detects ' + card, testCard(card));
  });

  it('renders a token', function() {
    var formNode = this.CardForm.getDOMNode();
    assert.equal(formNode.getAttribute('data-token'), 'whatever');
  });

  it('renders an id', function() {
    var formNode = this.CardForm.getDOMNode();
    assert.equal(formNode.getAttribute('id'), 'something');
  });

  it('shows a card error on invalid input', function() {
    this.CardForm.handleChange({
      target: {
        value: helpers.testCards.invalidVisa,
        id: 'card',
      },
    });
    var card = helpers.findByClass(this.CardForm, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = helpers.findByClass(card, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

  it('shows a expiration error on invalid input', function() {
    this.CardForm.handleChange({
      target: {
        value: '13/__',
        id: 'expiration',
      },
    });
    var expiration = helpers.findByClass(this.CardForm, 'expiration');
    assert.include(expiration.props.className, 'invalid');
    var expirationError = helpers.findByClass(expiration, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(expirationError));
  });

  it('shows a cvv message on an api error', function() {
    this.CardForm.processApiErrors(helpers.cvvError);
    var cvv = helpers.findByClass(this.CardForm, 'cvv');
    assert.include(cvv.props.className, 'invalid');
    var cvvError = helpers.findByClass(cvv, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cvvError));
  });

  it('shows a card declined message', function() {
    this.CardForm.processApiErrors(helpers.declinedError);
    var card = helpers.findByClass(this.CardForm, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = helpers.findByClass(card, 'tooltip');
    assert.include(cardError.props.children, 'declined');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

});
