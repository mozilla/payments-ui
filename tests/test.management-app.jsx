import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { create as createRedux } from 'redux-config';

import ManagementApp from 'apps/management/app';

import * as helpers from './helpers';


describe('management/app', function() {
  var fakeWindow;
  var FakeManagement;
  var FakeManageCards;
  var redux;

  beforeEach(function() {
    fakeWindow = {
      location: {
        href: '/',
      },
    };
    FakeManagement = helpers.stubComponent();
    FakeManageCards = helpers.stubComponent();
    redux = createRedux();
  });

  function mountView({ window = fakeWindow } = {}) {
    var FluxContainer = helpers.getFluxContainer(redux);

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
