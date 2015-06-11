'use strict';

var React;
var TestUtils;

var ProductDetail = require('components/product-detail');

var helpers = require('./helpers');


describe('ProductDetail', function() {

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
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
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    assert.throws(function() {
      TestUtils.renderIntoDocument(
        <ProductDetail productId='not-real-product' />
      );
    }, /Invalid product/);
  });

});
