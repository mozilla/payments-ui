'use strict';

var React;
var TestUtils;

var actionTypes = require('action-types');
var reduxConfig = require('redux-config');
var CardChoice = require('components/card-choice');
var CardListing = require('views/card-listing');

var helpers = require('./helpers');

var TestUtils;
var savedVisa = {provider_id: '3vr3ym', type_name: 'Visa'};

describe('CardListingView', function() {

  var redux;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    redux = reduxConfig.create();
  });

  function mountView() {
    var FluxContainer = helpers.getFluxContainer(redux);
    var transitionSpy = sinon.spy(FluxContainer.router, 'transitionTo');

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (
            <CardListing productId='mozilla-concrete-brick' />
          );
        }}
      </FluxContainer>
    );
    var component = TestUtils.findRenderedComponentWithType(
      container, CardListing
    );

    return {
      component: component,
      transitionSpy: transitionSpy,
    };
  }

  function setUser(user) {
    user.email = user.email || 'f@f.com';
    redux.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    });
  }

  it('should redirect to card entry form when no saved cards', function() {
    setUser({
      payment_methods: [],
    });
    var view = mountView();
    assert.equal(view.transitionSpy.firstCall.args[0], 'card-form');
  });

  it('should show the card form if user has saved cards', function() {
    setUser({
      payment_methods: [savedVisa],
    });
    var view = mountView();
    var card = TestUtils.findRenderedComponentWithType(
      view.component, CardChoice
    );
    assert.deepEqual(card.props.cards, [savedVisa]);
  });

  it('should show card form when clicking add link', function() {
    // Need some payment methods to ensure the listing is shown.
    setUser({
      payment_methods: [savedVisa],
    });
    // Link.js checks which button is clicked, so we need to provide that
    // in the event.
    var event = {
      button: 0,
    };
    var view = mountView();
    var addLink = TestUtils.findRenderedDOMComponentWithTag(
      view.component, 'a');
    TestUtils.Simulate.click(addLink.getDOMNode(), event);
    assert.equal(view.transitionSpy.firstCall.args[0], 'card-form');
  });

});
