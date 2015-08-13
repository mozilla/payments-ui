import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { initialUserState } from 'reducers/user';
import SignIn from 'views/shared/sign-in';


describe('SignIn', function() {

  var fakeAccessToken = 'some-oauth-access-token';
  var fakeError;
  var fakeTokenSignIn;
  var fakeUser;
  var fakeUserSignIn;

  beforeEach(function() {
    fakeError = sinon.spy();
    fakeTokenSignIn = sinon.spy();
    fakeUser = Object.assign({}, initialUserState);
    fakeUserSignIn = sinon.spy();
  });

  function mountView({accessToken=fakeAccessToken, user=fakeUser, allowUserSignIn} = {}) {
    return TestUtils.renderIntoDocument(
      <SignIn
        accessToken={accessToken}
        allowUserSignIn={allowUserSignIn}
        error={fakeError}
        tokenSignIn={fakeTokenSignIn}
        user={user}
        userSignIn={fakeUserSignIn}
      />
    );
  }

  it('should sign in on mount', function() {
    mountView();
    assert.equal(fakeTokenSignIn.firstCall.args[0], fakeAccessToken);
  });

  it('should do a token sign-in with access token', function() {
    var token = 'some-fxa-token';
    mountView({accessToken: token});
    assert.equal(fakeTokenSignIn.firstCall.args[0], token);
  });

  it('should do a user sign-in without access token', function() {
    mountView({accessToken: null});
    assert.equal(fakeUserSignIn.called, true);
  });

  it('should not sign in when user is already signed in', function() {
    fakeUser.signedIn = true;
    mountView();
    assert.equal(fakeUserSignIn.called, false);
    assert.equal(fakeTokenSignIn.called, false);
  });

  it('should error when user sign-in not allowed', function() {
    mountView({allowUserSignIn: false, accessToken: null});
    assert.equal(fakeUserSignIn.called, false);
    assert.equal(fakeTokenSignIn.called, false);
    assert.equal(fakeError.called, true);
  });

});
