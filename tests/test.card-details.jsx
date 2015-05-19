var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var CardDetails = require('card-details');

describe('Card Details', function() {

  'use strict';

  it('Renders card-details', function() {
    var element = TestUtils.renderIntoDocument(<CardDetails />);
    assert.ok(element);
  });

});
