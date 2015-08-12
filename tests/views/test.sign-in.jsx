import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import SignIn from 'views/shared/sign-in';


describe('SignIn', function() {

  var accessToken = 'some-oauth-access-token';
  var tokenSignInSpy = sinon.spy();

  function mountView() {
    return TestUtils.renderIntoDocument(
      <SignIn accessToken={accessToken} tokenSignIn={tokenSignInSpy} />
    );
  }

  it('should sign in on mount', function() {
    mountView();
    assert.equal(tokenSignInSpy.firstCall.args[0], accessToken);
  });

});
