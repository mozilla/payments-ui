import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { initialUserState } from 'reducers/user';
import SignOut from 'views/shared/sign-out';


describe('SignOut', function() {

  var fakeShowSignIn;
  var fakeUser;
  var fakeUserSignOut;

  beforeEach(function() {
    fakeShowSignIn = sinon.spy();
    fakeUserSignOut = sinon.spy();
    fakeUser = Object.assign({}, initialUserState, {
      signedIn: true,
    });
  });

  function mountView() {
    return TestUtils.renderIntoDocument(
      <SignOut
        showSignIn={fakeShowSignIn}
        user={fakeUser}
        userSignOut={fakeUserSignOut}
      />
    );
  }

  it('should sign out on mount', function() {
    mountView();
    assert.equal(fakeUserSignOut.called, true);
  });

  it('should not do sign-out when already signed out', function() {
    fakeUser.signedIn = false;
    mountView();
    assert.equal(fakeUserSignOut.called, false);
  });

  it('should sign back in on button click', function() {
    fakeUser.signedIn = false;
    var view = mountView();
    var button = TestUtils.findRenderedDOMComponentWithTag(
      view, 'a');
    TestUtils.Simulate.click(button);
    assert.equal(fakeShowSignIn.called, true);
  });

});
