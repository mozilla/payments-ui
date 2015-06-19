'use strict';

var rewire = require('rewire');

var helpers = require('./helpers');

describe('CardListingView', function() {

  var UserStore;

  beforeEach(function() {
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
    var savedVisa = {provider_id: '3vr3ym', type_name: 'Visa'};
    setUser({
      payment_methods: [savedVisa],
    });
    var view = mountView();
    assert.deepEqual(view.component.state.cards, [savedVisa]);
  });

});
