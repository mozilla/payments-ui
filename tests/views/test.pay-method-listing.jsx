import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import PayMethodChoice from 'components/pay-method-choice';
import PayMethodListing from 'views/transaction/pay-method-listing';


describe('Pay Method Listing', function() {

  var payWithNewCardSpy;
  var View;
  var savedVisa = {provider_id: '3vr3ym', type_name: 'Visa'};

  beforeEach(function() {

    payWithNewCardSpy = sinon.spy();

    View = TestUtils.renderIntoDocument(
      <PayMethodListing
        payMethods={[savedVisa]}
        payWithNewCard={payWithNewCardSpy}
        productId='mozilla-concrete-brick' />
    );
  });

  it('should show payMethod choice', function() {
    var payMethod = TestUtils.findRenderedComponentWithType(
      View, PayMethodChoice
    );
    assert.deepEqual(payMethod.props.payMethods, [savedVisa]);
  });

  it('should request to pay with new card when clicking link', function() {
    var addLink = TestUtils.findRenderedDOMComponentWithTag(
      View, 'a');
    TestUtils.Simulate.click(addLink);
    assert.ok(payWithNewCardSpy.called);
  });

});
