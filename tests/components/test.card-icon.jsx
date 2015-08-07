import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import CardIcon from 'components/card-icon';

describe('Card Icon', function() {

  var cards = [
    'amex',
    'discover',
    'jcb',
    'maestro',
    'mastercard',
    'visa',
  ];

  function testCard(cardType) {
    return function() {
      var CardIcon_ = TestUtils.renderIntoDocument(
        <CardIcon cardType={cardType} />
       );
      var cardIconNode = findDOMNode(CardIcon_);
      assert.include(
        cardIconNode.getAttribute('class'), 'cctype-' + cardType);
    };
  }

  cards.forEach(function(card) {
    it('sets card class to: ' + card, testCard(card));
  });

});
