import React, { Component } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as actionTypes from 'constants/action-types';


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


export function findAllByClass(component, className){
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


export function stubComponent(mockTagName='div') {
  return class StubComponent extends Component {
    render() {
      return React.DOM[mockTagName](null, this.props.children);
    }
  };
}


export function getAppStateWithCSRF() {
  return {
    app: {
      csrfToken: 'some-csrf-token',
    },
  };
}


export function doApiAction(deferredAction, dispatchSpy,
                            getState=getAppStateWithCSRF) {
  //
  // Execute a deferred API action with a default csrf token for convenience.
  //
  if (!dispatchSpy) {
    dispatchSpy = sinon.spy();
  }
  deferredAction(dispatchSpy, getState);
}


export class FakeBraintreeClient {
  tokenizeCard(config, callback) {
    console.log('resolving braintree tokenization');
    callback(null, 'some-nonce');
  }
}


export class FakeBraintreeClientError {
  tokenizeCard(config, callback) {
    console.log('resolving braintree tokenization with error');
    callback("I'm some error");
  }
}

export function assertNotificationType(action, notificationType) {
  assert.equal(action.type, actionTypes.ADD_NOTIFICATION,
               'action.type should be ADD_NOTIFICATION');
  assert.equal(action.data.type, notificationType,
               'action.data.type should be ' + notificationType);
}

export function assertNotificationTextContains(action, textSubString) {
  assert.ok(typeof action.data.text === 'string',
            'action.data.text should be a string');
  assert.include(action.data.text, textSubString,
                 'action.data.text should include substring');
}

export function assertNotificationErrorCode(action, errorCode) {
  assertNotificationType(action, 'error');
  assert.equal(action.data.errorCode, errorCode,
               'action.data.errorCode must match errorCode');
}
