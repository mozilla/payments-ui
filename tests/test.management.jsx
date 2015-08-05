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

  function mountView({accessToken=null, user=fakeUser} = {}) {
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

  it('should do a token sign-in with access token', function() {
    var token = 'some-fxa-token';
    mountView({accessToken: token});
    assert.equal(fakeTokenSignIn.firstCall.args[0], token);
  });

  it('should do a user sign-in without access token', function() {
    mountView();
    assert.equal(fakeUserSignIn.called, true);
  });

  it('should not sign in when user is already signed in', function() {
    fakeUser.signedIn = true;
    mountView();
    assert.equal(fakeUserSignIn.called, false);
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

});
