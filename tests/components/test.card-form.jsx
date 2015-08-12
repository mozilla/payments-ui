import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../helpers';

import CardForm from 'components/card-form';


describe('Card Form', function() {

  var cards = [
    'amex',
    'discover',
    'jcb',
    'maestro',
    'mastercard',
    'visa',
  ];
  var handleCardSubmit;

  function mountView({errors=null} = {}) {
    return TestUtils.renderIntoDocument(
      <CardForm
        submissionErrors={errors}
        handleCardSubmit={handleCardSubmit}
        id="something"
      />
    );
  }

  beforeEach(function() {
    handleCardSubmit = sinon.spy();
  });

  function testCard(cardType) {
    var view = mountView();
    return function() {
      view.handleChange({
        target: {
          value: helpers.testCards[cardType],
          id: 'card',
        },
      });
      var cardIcon = helpers.findByClass(view, 'pay-method-icon');
      assert.include(cardIcon.props.className, 'pmtype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('Detects ' + card, testCard(card));
  });

  it('renders an id', function() {
    var view = mountView();
    var formNode = findDOMNode(view);
    assert.equal(formNode.getAttribute('id'), 'something');
  });

  it('shows a card error on invalid input', function() {
    var view = mountView();
    view.handleChange({
      target: {
        value: helpers.testCards.invalidVisa,
        id: 'card',
      },
    });
    var card = helpers.findByClass(view, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = helpers.findByClass(card, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

  it('shows an expiration error on invalid input', function() {
    var view = mountView();
    view.handleChange({
      target: {
        value: '13/__',
        id: 'expiration',
      },
    });
    var expiration = helpers.findByClass(view, 'expiration');
    assert.include(expiration.props.className, 'invalid');
    var expirationError = helpers.findByClass(expiration, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(expirationError));
  });

  it('shows a cvv message from error props', function() {
    var view = mountView({errors: helpers.cvvError});
    var cvv = helpers.findByClass(view, 'cvv');
    assert.include(cvv.props.className, 'invalid');
    var cvvError = helpers.findByClass(cvv, 'tooltip');
    assert.ok(TestUtils.isCompositeComponent(cvvError));
  });

  it('shows a card declined message', function() {
    var view = mountView({errors: helpers.declinedError});
    var card = helpers.findByClass(view, 'card');
    assert.include(card.props.className, 'invalid');
    var cardError = helpers.findByClass(card, 'tooltip');
    assert.include(cardError.props.children, 'declined');
    assert.ok(TestUtils.isCompositeComponent(cardError));
  });

  it('should not have a name attr on any input', function() {
    var view = mountView();
    var inputs = helpers.findAllByTag(view, 'input');
    for (var i = 0; i < inputs.length; i += 1) {
      var input = findDOMNode(inputs[i]);
      if (input.getAttribute('name') !== null) {
        throw new Error('A name attr should not be set on any cc form fields');
      }
    }
  });

  it('should have type=tel and autocomplete=off on all fields', function() {
    var view = mountView();
    var inputs = helpers.findAllByTag(view, 'input');
    for (var i = 0; i < inputs.length; i += 1) {
      var input = findDOMNode(inputs[i]);
      assert.equal(input.getAttribute('autocomplete'),
                   'off', 'autocomplete attr should be "off"');
      assert.equal(input.getAttribute('type'),
                   'tel', 'type attr should be "tel"');
    }
  });

});
