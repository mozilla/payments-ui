import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../helpers';

import { createReduxStore } from 'data-store';
import { initialUserState } from 'reducers/user';
import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import TransactionApp from 'apps/transaction/app';
import ErrorMessage from 'components/error';


describe('Transaction App', function() {

  var accessToken = 'some-oauth-token';
  var defaultProductId = 'mozilla-concrete-brick';
  var FakeSignIn = helpers.stubComponent();
  var FakeTransaction = helpers.stubComponent();
  var store;

  beforeEach(function() {
    store = createReduxStore();
  });

  function mountView({productId=defaultProductId} = {}) {
    var FluxContainer = helpers.getFluxContainer(store);

    var fakeWin = {
      'location': {
        'href': ('http://pay.dev/?access_token=' + accessToken +
                 '&product=' + productId),
      },
    };

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (
            <TransactionApp
              SignIn={FakeSignIn} Transaction={FakeTransaction} win={fakeWin} />
          );
        }}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, TransactionApp
    );
  }

  it('should have an initial user imported correctly', function() {
    assert.equal(initialUserState.braintreeToken, null);
    assert.equal(initialUserState.signedIn, false);
  });

  it('should render an error', function() {
    var View = mountView();
    store.dispatch(appActions.error('this is some error'));
    var error = TestUtils.findRenderedComponentWithType(
      View, ErrorMessage
    );
    // Maybe expand this test later if we pass in custom properties.
    assert.ok(error);
  });

  it('should render a sign-in page', function() {
    var View = mountView();
    var signIn = TestUtils.findRenderedComponentWithType(
      View, FakeSignIn
    );
    assert.equal(signIn.props.accessToken, accessToken);
    assert.equal(signIn.props.allowUserSignIn, false);
  });

  it('should render a purchase page', function() {
    var user = Object.assign({}, initialUserState, {
      email: 'f@f.com',
      signedIn: true,
    });

    var View = mountView();
    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    });

    var purchase = TestUtils.findRenderedComponentWithType(
      View, FakeTransaction
    );
    assert.deepEqual(purchase.props.user, user);
  });

  it('should skip sign-in for a donation product', function() {

    var View = mountView({productId: 'mozilla-foundation-donation'});

    // Make sure we are in the transaction flow, not sign-in.
    TestUtils.findRenderedComponentWithType(
      View, FakeTransaction
    );
  });

});
