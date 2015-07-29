import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import BraintreeToken from 'views/braintree-token';


describe('BraintreeToken', function() {

  var getBraintreeTokenSpy = sinon.spy();

  function mountView() {
    return TestUtils.renderIntoDocument(
      <BraintreeToken getBraintreeToken={getBraintreeTokenSpy} />
    );
  }

  it('should sign in on mount', function() {
    mountView();
    assert.ok(getBraintreeTokenSpy.called);
  });

});
