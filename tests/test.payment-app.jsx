import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from './helpers';

import { createReduxStore } from 'data-store';
import { defaults as defaultUser } from 'reducers/user';
import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import PaymentApp from 'apps/payment/app';
import ErrorMessage from 'components/error';


describe('Payment App', function() {

  var accessToken = 'some-oauth-token';
  var productId = 'mozilla-concrete-brick';
  var FakeLogin = helpers.stubComponent();
  var FakePurchase = helpers.stubComponent();
  var store;

  beforeEach(function() {
    store = createReduxStore();
  });

  function mountView() {
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
            <PaymentApp
              Login={FakeLogin} Purchase={FakePurchase} win={fakeWin} />
          );
        }}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, PaymentApp
    );
  }

  it('should have a defaultUser imported correctly', function() {
    assert.equal(defaultUser.braintreeToken, null);
    assert.equal(defaultUser.signedIn, false);
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
    var login = TestUtils.findRenderedComponentWithType(
      View, FakeLogin
    );
    assert.equal(login.props.accessToken, accessToken);
  });

  it('should render a purchase page', function() {
    var user = Object.assign({}, defaultUser, {
      email: 'f@f.com',
      signedIn: true,
    });

    var View = mountView();
    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    });

    var purchase = TestUtils.findRenderedComponentWithType(
      View, FakePurchase
    );
    assert.deepEqual(purchase.props.user, user);
  });

});
