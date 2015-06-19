'use strict';

var TestUtils = require('react/lib/ReactTestUtils');
var rewire = require('rewire');

var ErrorMessage = require('components/error');

var helpers = require('./helpers');

describe('Login', function() {

  var AppStore;

  beforeEach(function() {

    AppStore = {
      getError: sinon.spy(),
      addErrorListener: sinon.spy(),
      removeErrorListener: sinon.spy(),
    };

  });

  function mountView() {
    var App = rewire('app');
    App.__set__({
      AppStore: AppStore,
    });

    return helpers.getRoutedComponent(App.component, {}, {
      getCurrentQuery: function() {
        return {
          product: 'mozilla-concrete-brick',
        };
      },
    });
  }

  it('should listen to app errors', function() {
    var view = mountView();
    assert.equal(AppStore.addErrorListener.firstCall.args[0],
                 view.component.onError);
  });

  it('should clean up error listeners', function() {
    var view = mountView();
    view.component.componentWillUnmount();
    assert.equal(AppStore.removeErrorListener.firstCall.args[0],
                 view.component.onError);
  });

  it('should render an error', function() {
    AppStore.getError = function() {
      return {
        debugMessage: 'this is some error',
      };
    };
    var view = mountView();
    view.component.onError();
    var error = TestUtils.findRenderedComponentWithType(
      view.component, ErrorMessage
    );
    // Maybe expand this test later if we pass in custom properties.
    assert.ok(error);
  });

});
