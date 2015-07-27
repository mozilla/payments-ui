import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { createReduxStore } from 'data-store';

import ManagementApp from 'apps/management/app';

import * as helpers from './helpers';


describe('management/app', function() {
  var fakeWindow;
  var FakeManagement;
  var FakeManageCards;
  var store;

  beforeEach(function() {
    fakeWindow = {
      location: {
        href: '/',
      },
    };
    FakeManagement = helpers.stubComponent();
    FakeManageCards = helpers.stubComponent();
    store = createReduxStore();
  });

  function mountView({ window = fakeWindow } = {}) {
    var FluxContainer = helpers.getFluxContainer(store);

    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {() => <ManagementApp
                  window={window}
                  Management={FakeManagement}
                  ManageCards={FakeManageCards}
         />}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, ManagementApp
    );
  }

  it('should pass an access token', function() {
    var token = 'some-fxa-token';

    var view = mountView({
      window: {
        location: {
          href: '/?access_token=' + token,
        },
      },
    });

    var child = TestUtils.findRenderedComponentWithType(
      view, FakeManagement
    );
    assert.equal(child.props.accessToken, token);

  });

});
