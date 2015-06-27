'use strict';

var React;
var TestUtils;

var CompletePayment = require('views/complete-payment');

var helpers = require('./helpers');


describe('CompletePayment', function() {

  beforeEach(function() {
    this.email = 'buyer@somewhere.org';

    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');

    this.CompletePayment = TestUtils.renderIntoDocument(
      <CompletePayment productId='mozilla-concrete-brick'
                       userEmail={this.email} />
    );

    sinon.stub(window.parent, 'postMessage');
  });

  afterEach(function() {
    window.parent.postMessage.restore();
  });

  it('should show where the receipt was emailed', function() {
    var email = helpers.findByClass(this.CompletePayment, 'email');
    assert.equal(email.getDOMNode().textContent, this.email);
  });

  it('should fire handleClick when OK button is clicked', function() {
    var event = {
      preventDefault: sinon.stub(),
    };
    this.button = TestUtils.findRenderedDOMComponentWithTag(
      this.CompletePayment, 'button');

    TestUtils.Simulate.click(this.button, event);
    assert.equal(event.preventDefault.callCount, 1);
    assert.ok(window.parent.postMessage.calledWith(
      JSON.stringify({event: 'purchase-completed'}), '*'));
  });

});
