import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import ProductDetail from 'components/product-detail';
import CompletePayment from 'views/transaction/complete-payment';

import * as helpers from '../helpers';


describe('CompletePayment', function() {
  var sandbox;
  var email = 'buyer@somewhere.org';
  var win;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    win = {
      parent: {
        postMessage: sandbox.stub(),
      },
    };
  });

  function mountView({productId='mozilla-concrete-brick',
                      userEmail=email,
                      ...props} = {}) {
    return TestUtils.renderIntoDocument(
      <CompletePayment productId={productId}
                       userEmail={userEmail}
                       win={win}
                       {...props} />
    );
  }

  afterEach(function() {
    sandbox.restore();
  });

  it('should show where the receipt was emailed', function() {
    var view = mountView();
    var emailElem = helpers.findByClass(view, 'email');
    assert.equal(findDOMNode(emailElem).textContent, email);
  });

  it('should not show email message if no email', function() {
    var view = mountView({userEmail: null});
    assert.throws(
      () => helpers.findByClass(view, 'email'),
      Error, /Did not find exactly one match/);
  });

  it('should have a button with OK', function() {
    var view = mountView();
    var button = TestUtils.findRenderedDOMComponentWithTag(
      view, 'button');
    assert.equal(React.findDOMNode(button).textContent, 'OK');
  });

  it('should fire handleClick when OK button is clicked', function() {
    var view = mountView();
    var event = {
      preventDefault: sinon.stub(),
    };
    var button = TestUtils.findRenderedDOMComponentWithTag(
      view, 'button');
    TestUtils.Simulate.click(button, event);
    assert.equal(event.preventDefault.callCount, 1);
    assert.ok(win.parent.postMessage.calledWith(
      JSON.stringify({event: 'purchase-completed'}), '*'));
  });

  it('should pass amount to product details', function() {
    var view = mountView({userDefinedAmount: '10.00'});
    var product = TestUtils.findRenderedComponentWithType(
      view, ProductDetail
    );
    assert.equal(product.props.userDefinedAmount, '10.00');
  });

  it('should show a payment accepted message', function() {
    var view = mountView({productId: 'mozilla-concrete-brick'});
    var msg = helpers.findByClass(view, 'accepted');
    assert.equal(findDOMNode(msg).textContent, 'Payment Accepted');
  });

  it('should show a donation sent message', function() {
    var view = mountView({productId: 'mozilla-foundation-donation'});
    var msg = helpers.findByClass(view, 'accepted');
    assert.equal(findDOMNode(msg).textContent, 'Donation Sent');
  });

});
