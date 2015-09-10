import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';

import * as helpers from '../helpers';

import { createReduxStore } from 'data-store';
import { initialUserState } from 'reducers/user';
import * as actionTypes from 'constants/action-types';
import { default as TransactionApp } from 'apps/transaction/app';
import Notification from 'components/notification';


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
    var fakeWin = {
      location: {
        href: ('http://pay.dev/?access_token=' + accessToken +
               '&product=' + productId),
      },
    };

    var container = TestUtils.renderIntoDocument(
      <Provider store={store}>
        {() => {
          return (
            <TransactionApp
              SignIn={FakeSignIn}
              Transaction={FakeTransaction}
              win={fakeWin}
            />
          );
        }}
      </Provider>
    );
    return TestUtils.findRenderedComponentWithType(
      container, TransactionApp
    );
  }

  it('should have an initial user imported correctly', function() {
    assert.equal(initialUserState.braintreeToken, null);
    assert.equal(initialUserState.signedIn, false);
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

    assert.ok(TestUtils.findRenderedComponentWithType(
      View, FakeTransaction
    ));
  });

  it('should skip sign-in for a donation product', function() {

    var View = mountView({productId: 'mozilla-foundation-donation'});

    // Make sure we are in the transaction flow, not sign-in.
    TestUtils.findRenderedComponentWithType(
      View, FakeTransaction
    );
  });

  it('should dispatch an error for unknown products', function() {
    var View = mountView({productId: 'not-a-known-product-id'});
    var error = TestUtils.findRenderedComponentWithType(
      View, Notification
    );
    assert.ok(error);
  });

});
