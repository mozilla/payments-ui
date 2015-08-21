import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../helpers';

import * as actionTypes from 'constants/action-types';
import * as transactionActions from 'actions/transaction';
import { createReduxStore } from 'data-store';
import { defaultState as defaultUser } from 'reducers/user';

import Transaction from 'views/transaction';


describe('Transaction', function() {

  var fakeUser;
  var productId = 'mozilla-concrete-brick';
  var FakeBraintreeToken = helpers.stubComponent();
  var FakeCompletePayment = helpers.stubComponent();
  var FakeProductPayChooser = helpers.stubComponent();
  var FakeProductPay = helpers.stubComponent();
  var store;

  beforeEach(function() {
    store = createReduxStore();
    fakeUser = Object.assign({}, defaultUser, {
      email: 'f@f.com',
    });
  });

  function mountView({...props} = {}) {
    var FluxContainer = helpers.getFluxContainer(store);

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (
            <Transaction
              BraintreeToken={FakeBraintreeToken}
              ProductPay={FakeProductPay}
              ProductPayChooser={FakeProductPayChooser}
              CompletePayment={FakeCompletePayment}
              user={fakeUser}
              productId={productId}
              {...props}
            />
          );
        }}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, Transaction
    );
  }

  function signInUser({payMethods}) {
    store.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: Object.assign({}, fakeUser, {
        payMethods: payMethods,
      }),
    });

    store.dispatch({
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      braintreeToken: 'braintree-token',
    });
  }

  it('should show pay chooser when user has pay methods', function() {
    var payMethods = [{type: 'Visa'}];
    var View = mountView();

    signInUser({payMethods: payMethods})

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeProductPayChooser
    );
    assert.equal(child.props.productId, productId);
    assert.equal(child.props.payMethods, payMethods);
  });

  it('should show new payment form when user has no pay methods', function() {
    var View = mountView();

    signInUser({payMethods: []});

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeProductPay
    );
    assert.equal(child.props.productId, productId);
  });

  it('should render a payment completed page', function() {
    var View = mountView({amount: '5.00'});

    store.dispatch(transactionActions.complete());

    var child = TestUtils.findRenderedComponentWithType(
      View, FakeCompletePayment
    );
    assert.equal(child.props.userEmail, fakeUser.email);
    assert.equal(child.props.amount, '5.00');
  });

  it('should render new card entry on explicit request', function() {
    var payMethods = [{type: 'Visa'}];
    var View = mountView();

    // When a user signs in this would normally trigger a pay chooser.
    signInUser({payMethods: payMethods});

    // Dispatch a specific payWithNewCard request.
    store.dispatch(transactionActions.payWithNewCard());

    // Instead make sure a new card entry form was rendered.
    TestUtils.findRenderedComponentWithType(
      View, FakeProductPay
    );
  });

});
