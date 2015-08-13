import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import PayMethods from 'views/management/pay-methods';

import * as helpers from '../helpers';


describe('Pay Methods', function() {

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

    this.getPayMethodsStub = sinon.stub();
    this.PayMethods = TestUtils.renderIntoDocument(
      <PayMethods
        payMethods={fakeCards}
        getPayMethods={this.getPayMethodsStub} />
    );
  });

  it('should call getPayMethods stub', function() {
    assert.equal(this.getPayMethodsStub.called, true);
  });

  it('should have a card dropdown', function() {
    var content = helpers.findByClass(this.PayMethods, 'proxy-select');
    assert.ok(TestUtils.isDOMComponent(content));
  });

  it('should show no-results message', function() {
    var noPayMethods = TestUtils.renderIntoDocument(
      <PayMethods
        payMethods={[]}
        getPayMethods={this.getPayMethodsStub} />
    );
    var content = helpers.findByClass(noPayMethods, 'no-results');
    assert.ok(TestUtils.isDOMComponent(content));
  });

  it('should have disabled class on delete link if no cards', function() {
    var noPayMethods = TestUtils.renderIntoDocument(
      <PayMethods
        payMethods={[]}
        getPayMethods={this.getPayMethodsStub} />
    );
    var delButton = helpers.findByClass(noPayMethods, 'delete').getDOMNode();
    assert.ok(delButton.className.split(' ').indexOf('disabled') > -1);
  });

});
