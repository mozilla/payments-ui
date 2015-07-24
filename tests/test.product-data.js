import products from 'products';


describe('products', function() {

  it('should have concrete brick data', function() {
    assert.equal(products['mozilla-concrete-brick'].id,
                 'mozilla-concrete-brick');
  });

  it('should have concrete mortar data', function() {
    assert.equal(products['mozilla-concrete-mortar'].id,
                 'mozilla-concrete-mortar');
  });

});
