'use strict';

var React;
var TestUtils;

var app = require('app');
var appActions = require('app-actions');
var reduxConfig = require('redux-config');
var ErrorMessage = require('components/error');

var helpers = require('./helpers');

describe('App', function() {

  var redux;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    redux = reduxConfig.create();
  });

  function mountView() {
    var FluxContainer = helpers.getFluxContainer(redux, {
      getCurrentQuery: function() {
        return {
          product: 'mozilla-concrete-brick',
        };
      },
    });

    var App = app.component;
    var container = TestUtils.renderIntoDocument(
      <FluxContainer>
        {function() {
          return (<App />);
        }}
      </FluxContainer>
    );
    var component = TestUtils.findRenderedComponentWithType(
      container, App
    );

    return {
      component: component,
      transitionSpy: FluxContainer.transitionSpy,
    };
  }

  it('should render an error', function() {
    var view = mountView();
    redux.dispatch(appActions.error('this is some error'));
    var error = TestUtils.findRenderedComponentWithType(
      view.component, ErrorMessage
    );
    // Maybe expand this test later if we pass in custom properties.
    assert.ok(error);
  });

});
