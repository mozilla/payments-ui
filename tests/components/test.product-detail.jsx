import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import ProductDetail from 'components/product-detail';
import * as products from 'products';
import * as helpers from '../helpers';


describe('ProductDetail', function() {
  var defaultProductId = 'mozilla-concrete-brick';

  function mountView({userDefinedAmount, productId=defaultProductId} = {}) {
    return TestUtils.renderIntoDocument(
      <ProductDetail productId={productId}
        userDefinedAmount={userDefinedAmount} />
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
    var view = mountView({productId: 'mozilla-foundation-donation'});
    assert.throws(
      () => helpers.findByClass(view, 'recurrence'),
      Error, /Did not find exactly one match/);
  });

  it('should show fixed price', function() {
    var view = mountView();
    var price = helpers.findByClass(view, 'price');
    var product = products.get(defaultProductId);
    assert.equal(price.getDOMNode().textContent, product.price.en);
  });

  it('should show variable price', function() {
    var view = mountView({
      userDefinedAmount: '5.00',
      productId: 'mozilla-foundation-donation',
    });

    var renderedPrice = helpers.findByClass(view, 'price');
    assert.equal(renderedPrice.getDOMNode().textContent, '$5.00');
  });

  it('should fix up variable price numbers', function() {
    var view = mountView({
      userDefinedAmount: '5.3457888',
      productId: 'mozilla-foundation-donation',
    });

    var renderedPrice = helpers.findByClass(view, 'price');
    assert.equal(renderedPrice.getDOMNode().textContent, '$5.35');
  });

  it('should render variable price integers', function() {
    var view = mountView({
      userDefinedAmount: '5',
      productId: 'mozilla-foundation-donation',
    });

    var renderedPrice = helpers.findByClass(view, 'price');
    assert.equal(renderedPrice.getDOMNode().textContent, '$5.00');
  });

  it('should ignore variable price when product has fixed price', function() {
    var view = mountView({userDefinedAmount: '5.00'});

    var renderedPrice = helpers.findByClass(view, 'price');
    var product = products.get(defaultProductId);
    assert.equal(renderedPrice.getDOMNode().textContent, product.price.en);
  });

});


describe('ProductDetail Exceptions', function() {

  it('should throw error with invalid product', function() {
    assert.throws(function() {
      TestUtils.renderIntoDocument(
        <ProductDetail productId="not-real-product" />
      );
    }, /Invalid product/);
  });

});
