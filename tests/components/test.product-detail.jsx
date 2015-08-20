import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import ProductDetail from 'components/product-detail';
import * as products from 'products';
import * as helpers from '../helpers';


describe('ProductDetail', function() {
  var defaultProductId = "mozilla-concrete-brick";

  function mountView({price, productId=defaultProductId} = {}) {
    return TestUtils.renderIntoDocument(
      <ProductDetail productId={productId} price={price} />
    );
  }

  it('should show product detail', function() {
    var view = mountView();
    var title = helpers.findByClass(view, 'title');
    assert.ok(TestUtils.isDOMComponent(title));
  });

  it('should show recurrence for monthly', function() {
    var view = mountView();
    var title = helpers.findByClass(view, 'recurrence');
    assert.ok(TestUtils.isDOMComponent(title));
  });

  it('should not show recurrence for none', function() {
    var view = mountView({productId: "mozilla-foundation-donation"});
    expect(() => helpers.findByClass(view, 'recurrence'))
      .to.throw('Did not find exactly one match');
  });

  it('should show fixed price', function() {
    var view = mountView();
    var price = helpers.findByClass(view, 'price');
    var product = products.get(defaultProductId);
    assert.equal(price.getDOMNode().textContent, product.price.en);
  });

  it('should show variable price', function() {
    var price = '5.00';
    var productId = 'mozilla-foundation-donation';

    var view = mountView({
      price: price,
      productId: productId,
    });

    var renderedPrice = helpers.findByClass(view, 'price');
    assert.equal(renderedPrice.getDOMNode().textContent, price);
  });

  it('should ignore variable price when product has fixed price', function() {
    var view = mountView({price: '5.00'});

    var renderedPrice = helpers.findByClass(view, 'price');
    var product = products.get(defaultProductId);
    assert.equal(renderedPrice.getDOMNode().textContent, product.price.en);
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
