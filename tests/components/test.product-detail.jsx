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
