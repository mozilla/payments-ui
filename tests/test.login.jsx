'use strict';

var React;
var TestUtils;

var Login = require('views/login');


describe('Login', function() {

  var accessToken = 'some-oauth-access-token';
  var signInSpy = sinon.spy();

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
  });

  function mountView() {
    return TestUtils.renderIntoDocument(
      <Login accessToken={accessToken} signIn={signInSpy} />
    );
  }

  it('should sign in on mount', function() {
    mountView();
    assert.equal(signInSpy.firstCall.args[0], accessToken);
  });

});
