import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';

import { createReduxStore } from 'data-store';

import * as actionTypes from 'constants/action-types';
import * as mgmtActions from 'actions/management';
import ManagementApp from 'apps/management/app';

import * as helpers from '../helpers';


describe('management/app', function() {
  var fakeWindow;
  var FakeManagement;
  var FakeManageCards;
  var FakeSignIn;
  var store;

  beforeEach(function() {
    fakeWindow = {
      location: {
        href: '/',
      },
    };
    FakeManagement = helpers.stubComponent();
    FakeManageCards = helpers.stubComponent();
    FakeSignIn = helpers.stubComponent();
    store = createReduxStore();
  });

  function mountView({ window = fakeWindow } = {}) {

    var container = TestUtils.renderIntoDocument(
      <Provider store={store}>
        {() => <ManagementApp
                  window={window}
                  Management={FakeManagement}
                  ManageCards={FakeManageCards}
                  SignIn={FakeSignIn}
         />}
      </Provider>
    );
    return TestUtils.findRenderedComponentWithType(
      container, ManagementApp
    );
  }

  it('should sign-in with access token', function() {
    var token = 'some-fxa-token';

    var view = mountView({
      window: {
        location: {
          href: '/?access_token=' + token,
        },
      },
    });

    var mgmt = TestUtils.findRenderedComponentWithType(
      view, FakeManagement
    );
    // The second child should be the sign-in component.
    // Make sure it gets the access token.
    var signIn = mgmt.props.children[1];
    assert.equal(signIn.props.accessToken, token);

  });

  it('should pass in card submission errors', function() {
    store.dispatch({
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      braintreeToken: 'some-token',
    });
    store.dispatch(mgmtActions.showAddPayMethod());
    var apiError = {error_response: 'some error'};
    store.dispatch({
      type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
      apiErrorResult: apiError,
    });
    var view = mountView();

    var mgmt = TestUtils.findRenderedComponentWithType(
      view, FakeManagement
    );
    var addPayMethod = mgmt.props.children[1];
    assert.equal(addPayMethod.props.cardSubmissionErrors, apiError);

  });

});
