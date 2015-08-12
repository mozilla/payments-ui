import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { initialUserState } from 'reducers/user';
import Management from 'views/management';

import * as helpers from '../helpers';


describe('Management', function() {
  var fakeSubscriptionGetter;
  var fakeShowSignOut;
  var fakeUser;

  beforeEach(function() {
    fakeSubscriptionGetter = sinon.stub();
    fakeShowSignOut = sinon.stub();
    fakeUser = Object.assign({}, initialUserState, {
      signedIn: true,
      email: 'f@f.com',
    });
  });

  function mountView() {
    return TestUtils.renderIntoDocument(
      <Management
        getUserSubscriptions={fakeSubscriptionGetter}
        showSignOut={fakeShowSignOut}
        user={fakeUser}
      />
    );
  }

  it('should sign out on button click', function() {
    var view = mountView();
    var button = helpers.findById(view, 'show-sign-out');

    TestUtils.Simulate.click(button);
    assert.equal(fakeShowSignOut.called, true);
  });

});
