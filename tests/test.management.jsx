import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Management from 'views/management';

import * as helpers from './helpers';


describe('Management', function() {
  var fakeSubscriptionGetter;
  var fakeTokenSignIn;
  var fakeUser;
  var fakeUserSignIn;
  var fakeUserSignOut;

  beforeEach(function() {
    fakeSubscriptionGetter = sinon.stub();
    fakeTokenSignIn = sinon.stub();
    fakeUser = {signedIn: false};
    fakeUserSignIn = sinon.stub();
    fakeUserSignOut = sinon.stub();
  });

  function mountView({accessToken = null, user = fakeUser } = {}) {
    return TestUtils.renderIntoDocument(
      <Management
        getUserSubscriptions={fakeSubscriptionGetter}
        accessToken={accessToken}
        tokenSignIn={fakeTokenSignIn}
        user={user}
        userSignIn={fakeUserSignIn}
        userSignOut={fakeUserSignOut}
      />
    );
  }

  it('should sign in with access token', function() {
    var token = 'some-fxa-token';
    mountView({accessToken: token});
    assert.equal(fakeTokenSignIn.firstCall.args[0], token);
  });

  it('should skip token sign in without a value', function() {
    mountView({accessToken: null});
    assert.equal(fakeTokenSignIn.called, false);
  });

  it.skip('should sign in on button click', function() {
    var view = mountView();
    var button = helpers.findById(view, 'sign-in-toggle');

    TestUtils.Simulate.click(button);
    assert.equal(fakeUserSignIn.called, true);
  });

  it.skip('should sign out on button click', function() {
    var view = mountView({user: {signedIn: true}});
    var button = helpers.findById(view, 'sign-in-toggle');

    TestUtils.Simulate.click(button);
    assert.equal(fakeUserSignOut.called, true);
  });

  it.skip('should show subscriptions on click', function() {
    var view = mountView();
    var button = helpers.findByClass(view, 'subs');

    TestUtils.Simulate.click(button);
    assert.equal(fakeSubscriptionGetter.called, true);
  });

});
