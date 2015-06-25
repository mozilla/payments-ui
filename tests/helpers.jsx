'use strict';

var assign = require('object-assign');
var React = require('react');

var TestUtils = require('react/lib/ReactTestUtils');

module.exports = {
  testCards: {
    amex: '378282246310005',
    discover: '6011111111111117',
    jcb: '3530111333300000',
    maestro: '6304000000000000',
    mastercard: '5555555555554444',
    visa: '4111111111111111',
    invalidVisa: '4111111111111113',
  },

  declinedError: {
    error_response: {
      braintree: {
        '__all__': [
          {'message': 'Do Not Honor', 'code': '2000'},
        ],
      },
    },
  },

  cvvError: {
    error_response: {
      braintree: {
        'cvv': [
          {'message': 'Gateway Rejected: cvv', 'code': 'cvv'},
        ],
      },
    },
  },

  findByClass: function(component, className){
    return TestUtils.findRenderedDOMComponentWithClass(component, className);
  },

  findByTag: function(component, tag){
    return TestUtils.findRenderedDOMComponentWithTag(component, tag);
  },

  getRouterStub: function(routerStubs) {

    function RouterStub() {}

    assign(RouterStub, {
      makePath () {},
      makeHref () {},
      transitionTo (path) {
        console.log('RouterStub: transitionTo:', path);
      },
      replaceWith () {},
      goBack () {},
      getCurrentPath () {},
      getCurrentRoutes () {},
      getCurrentPathname () {},
      getCurrentParams () {
        return {};
      },
      getCurrentQuery () {
        return {};
      },
      isActive () {},
      getRouteAtDepth() {},
      setRouteComponentAtDepth() {},

    }, routerStubs || {});

    return RouterStub;
  },

  getFluxContainer: function(redux, routerStubs) {
    //
    // Get a container component to set context stubs so you can use it
    // to wrap a component for testing.
    // You'd only need this to test a component that uses the router
    // and/or uses the redux Connector component.
    //
    // componentProps
    //  Optional object of properties to render the component with.
    //
    // routerStubs
    //  Option object of addtional stub methods for the stub router.
    //
    var RouterStub = this.getRouterStub(routerStubs);

    var FluxContainer = React.createClass({

      propTypes: {
        children: React.PropTypes.func.isRequired,
      },

      childContextTypes: {
        router: React.PropTypes.func.isRequired,
        redux: React.PropTypes.object.isRequired,
      },

      getChildContext: function() {
        return {router: RouterStub, redux: redux};
      },

      render () {
        return this.props.children();
      },

    });

    FluxContainer.router = RouterStub;

    return FluxContainer;
  },

  fakeJquery: function(opt) {
    //
    // Return a context to work with a fake jquery object in a test.
    //
    var componentContext;
    opt = opt || {};
    opt.returnedData = opt.returnedData || {};
    // Must be one of 'success', 'fail'
    opt.result = opt.result || 'success';

    var jqueryStubResponse = {
      fail: function() {
        return this;
      },
      then: function() {
        return this;
      },
    };

    if (opt.result === 'success') {
      jqueryStubResponse.then = function(callback) {
        console.log('jquery stub: executing success');
        callback.call(componentContext, opt.returnedData);
        return this;
      };
    } else if (opt.result === 'fail') {
      jqueryStubResponse.fail = function(callback) {
        callback.call(componentContext);
        return this;
      };
    } else {
      throw new Error('unexpected jquery stub result: ' + opt.result);
    }

    var jqueryStub = {
      ajax: function(ajaxOpt) {
        console.log('jquery stub: executing ajax()', ajaxOpt);
        componentContext = ajaxOpt.context;
        return jqueryStubResponse;
      },
      ajaxSetup: function() {},
    };

    return {
      ajaxSpy: sinon.spy(jqueryStub, 'ajax'),
      ajaxSetupSpy: sinon.spy(jqueryStub, 'ajaxSetup'),
      stub: jqueryStub,
    };
  },

};
