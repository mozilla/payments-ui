'use strict';

var React;
var TestUtils;
var rewire = require('rewire');

var reduxConfig = require('redux-config');

var helpers = require('./helpers');

describe('Login', function() {

  var userActions;
  var redux;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');

    userActions = {
      signIn: sinon.spy(function() {
        return function() {};
      }),
    };

    redux = reduxConfig.create();
  });

  function mountView() {
    var FluxContainer = helpers.getFluxContainer(redux);
    var transitionSpy = sinon.spy(FluxContainer.router, 'transitionTo');

    var Login = rewire('views/login');
    Login.__set__({
      userActions: userActions,
    });

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (<Login />);
        }}
      </FluxContainer>
    );
    var component = TestUtils.findRenderedComponentWithType(
      container, Login
    );

    return {
      component: component,
      transitionSpy: transitionSpy,
    };
  }

  it('should sign in on mount', function() {
    mountView();
    assert.ok(userActions.signIn.called);
  });

  it('should navigate to card-listing when user signs in', function() {
    var view = mountView();
    redux.dispatch({
      type: 'user-signed-in',
      user: {email: 'f@f.com'},
    });
    assert.equal(view.transitionSpy.firstCall.args[0], 'card-listing');
  });

});
