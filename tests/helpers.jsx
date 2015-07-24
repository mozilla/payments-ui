'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';


export const testCards = {
  amex: '378282246310005',
  discover: '6011111111111117',
  jcb: '3530111333300000',
  maestro: '6304000000000000',
  mastercard: '5555555555554444',
  visa: '4111111111111111',
  invalidVisa: '4111111111111113',
};


export const declinedError = {
  error_response: {
    braintree: {
      '__all__': [
        {'message': 'Do Not Honor', 'code': '2000'},
      ],
    },
  },
};


export const cvvError = {
  error_response: {
    braintree: {
      'cvv': [
        {'message': 'Gateway Rejected: cvv', 'code': 'cvv'},
      ],
    },
  },
};


export function findByClass(component, className){
  return TestUtils.findRenderedDOMComponentWithClass(component, className);
}


export function findAllByClass (component, className){
  return TestUtils.scryRenderedDOMComponentsWithClass(component, className);
}


export function findByTag(component, tag){
  return TestUtils.findRenderedDOMComponentWithTag(component, tag);
}


export function findAllByTag(component, tag){
  return TestUtils.scryRenderedDOMComponentsWithTag(component, tag);
}


export function getFluxContainer(redux) {
  //
  // Get a container component to set context stubs so you can use it
  // to wrap a component for testing.
  // You'd only need this to test a component that uses the
  // redux Connector component.
  //

  var FluxContainer = React.createClass({

    displayName: 'FluxContainer',

    propTypes: {
      children: React.PropTypes.func.isRequired,
    },

    childContextTypes: {
      redux: React.PropTypes.object.isRequired,
    },

    getChildContext: function() {
      return {redux: redux};
    },

    render () {
      return this.props.children();
    },

  });

  return FluxContainer;
}


export function fakeJquery(opt) {
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
}


export function stubComponent() {
  return React.createClass({
    displayName: 'StubComponent',
    render: function() {
      return <div></div>;
    },
  });
}
