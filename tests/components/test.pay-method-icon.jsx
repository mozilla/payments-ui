import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import PayMethodIcon from 'components/pay-method-icon';

describe('Pay Method Icon', function() {

  var payMethodTypes = [
    'amex',
    'discover',
    'jcb',
    'maestro',
    'mastercard',
    'visa',
  ];

  function testPayMethod(payMethodType) {
    return function() {
      var PayMethodIcon_ = TestUtils.renderIntoDocument(
        <PayMethodIcon payMethodType={payMethodType} />
       );
      var payMethodIconNode = findDOMNode(PayMethodIcon_);
      assert.include(
        payMethodIconNode.getAttribute('class'), 'pmtype-' + payMethodType);
    };
  }

  payMethodTypes.forEach(function(payMethod) {
    it('sets payMethod class to: ' + payMethod, testPayMethod(payMethod));
  });

});
