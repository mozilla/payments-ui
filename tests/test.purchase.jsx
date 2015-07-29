import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from './helpers';

import * as actionTypes from 'constants/action-types';
import * as purchaseActions from 'actions/purchase';
import { createReduxStore } from 'data-store';
import { defaults as defaultUser } from 'reducers/user';

import Purchase from 'views/purchase';


describe('Purchase', function() {

  var testUser;
  var productId = 'mozilla-concrete-brick';
  var FakeBraintreeToken = helpers.stubComponent();
  var FakeCompletePayment = helpers.stubComponent();
  var FakeCardListing = helpers.stubComponent();
  var FakeCardDetails = helpers.stubComponent();
  var store;

  beforeEach(function() {
    store = createReduxStore();
    testUser = Object.assign({}, defaultUser, {
      email: 'f@f.com',
    });
  });

  function mountView(userOverrides) {
    testUser = Object.assign({}, testUser, userOverrides);
    var FluxContainer = helpers.getFluxContainer(store);

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (
            <Purchase
              BraintreeToken={FakeBraintreeToken}
              CardDetails={FakeCardDetails}
              CardListing={FakeCardListing}
              CompletePayment={FakeCompletePayment}
              user={testUser} productId={productId} />
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
      user: Object.assign({}, testUser, {
        payment_methods: paymentMethods,
      }),
    });

    store.dispatch({
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      user: {
        braintreeToken: 'braintree-token',
      },
    });

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCardListing
    );
    assert.equal(child.props.productId, productId);
    assert.equal(child.props.paymentMethods, paymentMethods);
  });

  it('should render a card entry form', function() {
    var View = mountView();

    store.dispatch({
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      user: {
        braintreeToken: 'braintree-token',
      },
    });

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
    assert.equal(child.props.userEmail, testUser.email);
  });

  it('should render new card entry on explicit request', function() {
    var paymentMethods = [{type: 'Visa'}];
    var View = mountView();

    // Dispatch a user that would normally trigger a card listing.
    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: Object.assign({}, testUser, {
        payment_methods: paymentMethods,
      }),
    });

    store.dispatch({
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      user: {
        braintreeToken: 'braintree-token',
      },
    });

    store.dispatch(purchaseActions.payWithNewCard());

    // Instead make sure a new card entry form was rendered.
    TestUtils.findRenderedComponentWithType(
      View, FakeCardDetails
    );
  });

});
