'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');

var TestUtils;
var savedVisa = {provider_id: '3vr3ym', type_name: 'Visa'};

describe('CardListingView', function() {

  var UserStore;

  beforeEach(function() {
    TestUtils = require('react/lib/ReactTestUtils');
    var stubs = helpers.getUserStubs();
    UserStore = stubs.UserStore;
  });

  function mountView() {
    var CardListing = rewire('views/card-listing');
    CardListing.__set__({
      UserStore: UserStore,
    });

    return helpers.getRoutedComponent(CardListing, {
      productId: 'mozilla-concrete-brick',
    });
  }

  function setUser(user) {
    UserStore.getSignedInUser = function() {
      return user;
    };
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
    assert.deepEqual(view.component.state.cards, [savedVisa]);
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
