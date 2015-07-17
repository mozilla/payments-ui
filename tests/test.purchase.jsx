'use strict';

var React;
var TestUtils;
var assign = require('object-assign');
var rewire = require('rewire');

var actionTypes = require('constants/action-types');
var reduxConfig = require('redux-config');
var purchaseActions = require('actions/purchase');

var helpers = require('./helpers');

describe('Purchase', function() {

  var defaultUser = {
    email: 'f@f.com',
    payment_methods: [],
  };
  var productId = 'mozilla-concrete-brick';
  var FakeCompletePayment = helpers.stubComponent();
  var FakeCardListing = helpers.stubComponent();
  var FakeCardDetails = helpers.stubComponent();
  var redux;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    redux = reduxConfig.create();
  });

  function mountView(userOverrides) {
    var user = assign({}, defaultUser, userOverrides);
    var FluxContainer = helpers.getFluxContainer(redux);

    var Purchase = rewire('views/purchase');
    Purchase.__set__({
      'CompletePayment': FakeCompletePayment,
      'CardListing': FakeCardListing,
      'CardDetails': FakeCardDetails,
    });

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return <Purchase user={user} productId={productId} />;
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

    redux.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: assign({}, defaultUser, {
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

    redux.dispatch(purchaseActions.complete());

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCompletePayment
    );
    assert.equal(child.props.userEmail, defaultUser.email);
  });

  it('should render new card entry on explicit request', function() {
    var paymentMethods = [{type: 'Visa'}];
    var View = mountView();

    // Dispatch a user that would normally trigger a card listing.
    redux.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: assign({}, defaultUser, {
        payment_methods: paymentMethods,
      }),
    });

    redux.dispatch(purchaseActions.payWithNewCard());

    // Instead make sure a new card entry form was rendered.
    TestUtils.findRenderedComponentWithType(
      View, FakeCardDetails
    );
  });

});
