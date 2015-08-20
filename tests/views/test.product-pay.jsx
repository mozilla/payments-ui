import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import CardForm from 'components/card-form';
import ProductPay from 'views/transaction/product-pay';


describe('ProductPay', function() {

  var fakePaymentProcessor;
  var defaultProductId = 'mozilla-concrete-brick';
  var braintreeToken = 'some-braintree-token';
  var amount = '10.00';

  beforeEach(function() {
    fakePaymentProcessor = sinon.spy();
  });

  function mountView({productId=defaultProductId} = {}) {
    return TestUtils.renderIntoDocument(
      <ProductPay
        amount={amount}
        braintreeToken={braintreeToken}
        cardSubmissionErrors={{}}
        productId={productId}
        processPayment={fakePaymentProcessor}
      />
    );
  }

  it('should handle payment processing', function() {
    var View = mountView();
    var card = TestUtils.findRenderedComponentWithType(
      View, CardForm
    );

    var cardData = {number: '411111111111'};
    card.props.handleCardSubmit(cardData);

    assert.equal(fakePaymentProcessor.called, true);
    var args = fakePaymentProcessor.firstCall.args;
    assert.equal(args[0].amount, amount);
    assert.equal(args[0].productId, defaultProductId);
    assert.equal(args[0].creditCard, cardData);
    assert.equal(args[0].braintreeToken, braintreeToken);
  });

  it('should prompt for donation', function() {
    var View = mountView({productId: 'mozilla-foundation-donation'});
    var card = TestUtils.findRenderedComponentWithType(
      View, CardForm
    );
    assert.equal(card.props.submitPrompt, 'Donate now');
  });

});
