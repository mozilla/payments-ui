'use strict';

var React = require('react');
var TestUtils;
var rewire = require('rewire');

var actionTypes = require('actions/types');
var appActions = require('actions/app');
var reduxConfig = require('redux-config');
var ErrorMessage = require('components/error');

var helpers = require('./helpers');

describe('App', function() {

  var accessToken = 'some-oauth-token';
  var productId = 'mozilla-concrete-brick';
  var FakeLogin = helpers.stubComponent();
  var FakePurchase = helpers.stubComponent();
  var redux;

  beforeEach(function() {
    TestUtils = require('react/lib/ReactTestUtils');
    redux = reduxConfig.create();
  });

  function mountView() {
    var FluxContainer = helpers.getFluxContainer(redux);

    var app = rewire('apps/payment/app');
    app.__set__({
      'Login': FakeLogin,
      'Purchase': FakePurchase,
      'window': {
        'location': {
          'href': ('http://pay.dev/?access_token=' + accessToken +
                   '&product=' + productId),
        },
      },
    });

    var App = app.component;
    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return <App />;
        }}
      </FluxContainer>
    );
    return TestUtils.findRenderedComponentWithType(
      container, App
    );
  }

  it('should render an error', function() {
    var View = mountView();
    redux.dispatch(appActions.error('this is some error'));
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
    var user = {
      email: 'f@f.com',
      payment_methods: [],
      signedIn: true,
    };

    var View = mountView();
    redux.dispatch({
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    });

    var purchase = TestUtils.findRenderedComponentWithType(
      View, FakePurchase
    );
    assert.deepEqual(purchase.props.user, user);
  });

});
