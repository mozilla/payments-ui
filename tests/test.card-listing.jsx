'use strict';

var React;
var TestUtils;

var CardChoice = require('components/card-choice');
var CardListing = require('views/card-listing');


describe('CardListingView', function() {

  var payWithNewCardSpy;
  var View;
  var savedVisa = {provider_id: '3vr3ym', type_name: 'Visa'};

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');

    payWithNewCardSpy = sinon.spy();

    View = TestUtils.renderIntoDocument(
      <CardListing payWithNewCard={payWithNewCardSpy}
                   paymentMethods={[savedVisa]}
                   productId='mozilla-concrete-brick' />
    );
  });

  it('should show card choice', function() {
    var card = TestUtils.findRenderedComponentWithType(
      View, CardChoice
    );
    assert.deepEqual(card.props.cards, [savedVisa]);
  });

  it('should request to pay with new card when clicking link', function() {
    var addLink = TestUtils.findRenderedDOMComponentWithTag(
      View, 'a');
    TestUtils.Simulate.click(addLink.getDOMNode());
    assert.ok(payWithNewCardSpy.called);
  });

});
