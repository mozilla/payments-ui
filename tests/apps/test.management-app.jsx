import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';

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
    // The first child should be the sign-in component.
    // Make sure it gets the access token.
    var signIn = mgmt.props.children[0];
    assert.equal(signIn.props.accessToken, token);

  });

});
