import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Subscriptions from 'views/management/subscriptions';


describe('Subscriptions', function() {

  var getUserSubsSpy = sinon.stub();

  function mountView() {
    return TestUtils.renderIntoDocument(
      <Subscriptions getUserSubscriptions={getUserSubsSpy} />
    );
  }

  it('should call getUserSubscriptions on mount', function() {
    mountView();
    assert.equal(getUserSubsSpy.called, true);
  });

});
