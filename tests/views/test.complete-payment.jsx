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
    expect(() => helpers.findByClass(view, 'email'))
      .to.throw('Did not find exactly one match');
  });

  it('should fire handleClick when OK button is clicked', function() {
    var view = mountView();
    var event = {
      preventDefault: sinon.stub(),
    };
    var button = TestUtils.findRenderedDOMComponentWithTag(
      view, 'button');
    console.log(button);
    assert.equal(React.findDOMNode(button).textContent, 'OK');
    TestUtils.Simulate.click(button, event);
    assert.equal(event.preventDefault.callCount, 1);
    assert.ok(win.parent.postMessage.calledWith(
      JSON.stringify({event: 'purchase-completed'}), '*'));
  });

  it('should pass amount to product details', function() {
    var view = mountView({amount: '10.00'});
    var product = TestUtils.findRenderedComponentWithType(
      view, ProductDetail
    );
    assert.equal(product.props.price, '10.00');
  });

});
