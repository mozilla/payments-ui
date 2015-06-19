'use strict';

var assign = require('object-assign');
var React = require('react');
var Router = require('react-router');

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

  getRoutedComponent: function(targetComponent, componentProps) {
    //
    // Initialize a component with a router so it can be tested.
    //
    // targetComponent
    //  This is the React component class that you want to test.
    //
    // componentProps
    //  Optional object of properties to render the component with.
    //
    // inspired by http://bit.ly/1G0FX72
    //
    componentProps = componentProps || {};

    var transitionSpy = sinon.spy();
    var component;
    var Route = Router.Route;
    var TestLocation = Router.TestLocation;
    var location = new TestLocation(['/test']);

    var routes = (
      <Route name="test" path="/test" handler={targetComponent} />
    );

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
      getCurrentParams () {},
      getCurrentQuery () {},
      isActive () {},
      getRouteAtDepth() {},
      setRouteComponentAtDepth() {},
    });

    var StubRouterContext = function(Component, props) {

      // Stub out transitionTo() because it will only create errors saying
      // that no route exists (because we stubbed out routes).
      Component.transitionTo = transitionSpy;

      return React.createClass({
        displayName: 'StubRouterContext',

        childContextTypes: {
          router: React.PropTypes.func,
          routeDepth: React.PropTypes.number,
        },

        getChildContext () {
          return {
            router: RouterStub,
            routeDepth: 0,
          };
        },

        render () {
          return <Component {...props} />;
        },
      });
    };

    Router.run(routes, location, function (handler, props) {
      props = props || {};
      assign(props, componentProps);

      /*eslint-disable new-cap */
      var TestSubject = StubRouterContext(handler, props);
      /*eslint-enable */
      var mainComponent = React.render(<TestSubject />, global.document.body);

      // Now we can fetch our component that was rendered with a router.
      component = TestUtils.findRenderedComponentWithType(
        mainComponent, targetComponent
      );

    });

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
        getCurrentUser: sinon.spy(),
        getLoggedInUser: sinon.spy(),
        addSetUserListener: sinon.spy(),
        removeSetUserListener: sinon.spy(),
      },
    };
  },

};
