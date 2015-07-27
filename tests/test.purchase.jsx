import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from './helpers';

import * as actionTypes from 'constants/action-types';
import * as purchaseActions from 'actions/purchase';
import { createReduxStore } from 'data-store';

import Purchase from 'views/purchase';


describe('Purchase', function() {

  var defaultUser = {
    email: 'f@f.com',
    payment_methods: [],
  };
  var productId = 'mozilla-concrete-brick';
  var FakeCompletePayment = helpers.stubComponent();
  var FakeCardListing = helpers.stubComponent();
  var FakeCardDetails = helpers.stubComponent();
  var store;

  beforeEach(function() {
    store = createReduxStore();
  });

  function mountView(userOverrides) {
    var user = Object.assign({}, defaultUser, userOverrides);
    var FluxContainer = helpers.getFluxContainer(store);

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (
            <Purchase
              CardDetails={FakeCardDetails}
              CardListing={FakeCardListing}
              CompletePayment={FakeCompletePayment}
              user={user} productId={productId} />
          );
        }}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, Purchase
    );
  }

  it('should render a card listing', function() {
    var paymentMethods = [{type: 'Visa'}];
    var View = mountView();

    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: Object.assign({}, defaultUser, {
        payment_methods: paymentMethods,
      }),
    });

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCardListing
    );
    assert.equal(child.props.productId, productId);
    assert.equal(child.props.paymentMethods, paymentMethods);
  });

  it('should render a card entry form', function() {
    var View = mountView();
    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCardDetails
    );
    assert.equal(child.props.productId, productId);
  });

  it('should render a payment completed page', function() {
    var View = mountView();

    store.dispatch(purchaseActions.complete());

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCompletePayment
    );
    assert.equal(child.props.userEmail, defaultUser.email);
  });

  it('should render new card entry on explicit request', function() {
    var paymentMethods = [{type: 'Visa'}];
    var View = mountView();

    // Dispatch a user that would normally trigger a card listing.
    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: Object.assign({}, defaultUser, {
        payment_methods: paymentMethods,
      }),
    });

    store.dispatch(purchaseActions.payWithNewCard());

    // Instead make sure a new card entry form was rendered.
    TestUtils.findRenderedComponentWithType(
      View, FakeCardDetails
    );
  });

});
