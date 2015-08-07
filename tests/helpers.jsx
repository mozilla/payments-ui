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


export class FakeSyncPromise {
  /*
   * A minimal shim for a promise object that executes synchronously
   * for easier testing.
   * */

  constructor() {
    this.onResolved = null;
    this.onRejected = null;
  }

  then(onResolved, onRejected) {
    this.onResolved = onResolved;
    this.onRejected = onRejected;
  }

  catch(onRejected) {
    this.onRejected = onRejected;
  }

  reject(result) {
    this.onRejected(result);
  }

  resolve(result) {
    this.onResolved(result);
  }
}


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


export function findById(component, id){
  var results = TestUtils.findAllInRenderedTree(component, function(inst) {
    return TestUtils.isDOMComponent(inst) && inst.props.id === id;
  });
  if (results.length !== 1) {
    throw new Error('zero or multiple DOM nodes found for id ' + id);
  }
  return results[0];
}


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


export function findAllNodesByTag(component, tag){
  return findAllByTag(component, tag).map((item) => {
    return React.findDOMNode(item);
  });
}


export function getFluxContainer(store) {
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
      store: React.PropTypes.object.isRequired,
    },

    getChildContext: function() {
      return {store: store};
    },

    render() {
      return this.props.children();
    },

  });

  return FluxContainer;
}


export function fakeFetch({xhrError={}, returnedData={},
                           result='success'} = {}) {
  //
  // Return a context to work with a fake api.fetch() function in a test.
  //
  // result must be one of 'success', 'fail'
  //
  var stubResponse = {
    fail: function() {
      return this;
    },
    then: function() {
      return this;
    },
  };

  if (result === 'success') {
    stubResponse.then = function(callback) {
      console.log('fetch stub: executing success');
      callback.call({}, returnedData);
      return this;
    };
  } else if (result === 'fail') {
    stubResponse.fail = function(callback) {
      callback.call({}, xhrError);
      return this;
    };
  } else {
    throw new Error('unexpected stub result: ' + result);
  }

  function fetchStub(config) {
    console.log('fetch stub: executing', config);
    return stubResponse;
  }

  return sinon.spy(fetchStub);
}


export function stubComponent() {
  return React.createClass({
    displayName: 'StubComponent',
    render: function() {
      return <div></div>;
    },
  });
}
