import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import ProductDetail from 'components/product-detail';
import * as helpers from '../helpers';


describe('ProductDetail', function() {

  beforeEach(function() {
    this.ProductDetail = TestUtils.renderIntoDocument(
      <ProductDetail productId="mozilla-concrete-brick" />
    );
  });

  it('should show product detail', function() {
    var title = helpers.findByClass(this.ProductDetail, 'title');
    assert.ok(TestUtils.isDOMComponent(title));
  });

  it('should show recurrence for monthly', function() {
    var title = helpers.findByClass(this.ProductDetail, 'recurrence');
    assert.ok(TestUtils.isDOMComponent(title));
  });

  it('should not show recurrence for none', function() {
    this.ProductDetail = TestUtils.renderIntoDocument(
      <ProductDetail productId="mozilla-foundation-donation" />
    );
    expect(() => helpers.findByClass(this.ProductDetail, 'recurrence'))
      .to.throw('Did not find exactly one match');
  });
});


describe('ProductDetail Exceptions', function() {

  it('should throw error with invalid product', function() {
    assert.throws(function() {
      TestUtils.renderIntoDocument(
        <ProductDetail productId='not-real-product' />
      );
    }, /Invalid product/);
  });

});
