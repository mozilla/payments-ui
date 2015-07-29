import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import PayMethods from 'views/pay-methods';

import * as helpers from './helpers';


describe('PayMethods', function() {

  beforeEach(function() {
    const fakeCards = [
      {
        'id': 1,
        'resource_uri': 'something',
        'truncated_id': '4321',
        'type_name': 'visa',
      }, {
        'id': 2,
        'resource_uri': 'whatever',
        'truncated_id': '1234',
        'type_name': 'amex',
      },
    ];

    this.PayMethods = TestUtils.renderIntoDocument(
      <PayMethods paymentMethods={fakeCards} />
    );
  });

  it('should have a visa card present', function() {
    var content = helpers.findByClass(this.PayMethods, 'cctype-visa');
    assert.ok(TestUtils.isDOMComponent(content));
  });

  it('should have an amex card present', function() {
    var content = helpers.findByClass(this.PayMethods, 'cctype-amex');
    assert.ok(TestUtils.isDOMComponent(content));
  });

  it('should show no-results message', function() {
    var noPayMethods = TestUtils.renderIntoDocument(
      <PayMethods paymentMethods={[]} />
    );
    var content = helpers.findByClass(noPayMethods, 'no-results');
    assert.ok(TestUtils.isDOMComponent(content));
  });

});
