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

  getRoutedComponent: function(TargetComponent, componentProps, routerStubs) {
    //
    // Initialize a component with a stub router so it can be tested.
    //
    // TargetComponent
    //  This is the React component class that you want to test.
    //
    // componentProps
    //  Optional object of properties to render the component with.
    //
    // routerStubs
    //  Option object of addtional stub methods for the stub router.
    //
    componentProps = componentProps || {};

    function RouterStub() {}

    assign(RouterStub, {
      makePath () {},
      makeHref () {},
      transitionTo () {},
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

    var transitionSpy = sinon.spy(RouterStub, 'transitionTo');

    var FakeRouter = React.createClass({
      render () {
        return React.withContext({router: RouterStub}, function() {
          return <TargetComponent {...componentProps} />;
        });
      },
    });

    var container = TestUtils.renderIntoDocument(<FakeRouter />);
    var component = TestUtils.findRenderedComponentWithType(
      container, TargetComponent
    );

    return {
      component: component,
      router: RouterStub,
      transitionSpy: transitionSpy,
    };
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

  getUserStubs: function() {
    return {
      UserActions: {
        signIn: sinon.spy(),
      },
      UserStore: {
        getSignedInUser: sinon.spy(),
        addSignInListener: sinon.spy(),
        removeSignInListener: sinon.spy(),
      },
    };
  },

};
