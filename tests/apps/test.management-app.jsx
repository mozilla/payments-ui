import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';

import * as appActions from 'actions/app';
import { createReduxStore } from 'data-store';

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

  it('should display app errors', function() {
    var view = mountView();

    var appError = appActions.error('some error');
    store.dispatch(appError);

    var mgmt = TestUtils.findRenderedComponentWithType(
      view, FakeManagement
    );
    var errorPane = mgmt.props.children[1];
    assert.deepEqual(errorPane.props.error, appError.error);

  });

});
