import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as transactionActions from 'actions/transaction';

import * as helpers from '../helpers';


const fakeCreditCard = {
  number: '411111111111',
  cvv: '222',
  expiration: '06/16',
};


export function transactionData() {
  return [{
    kind: "subscription_charged_successfully",
    transaction: {
      resource_pk: 1,
      seller_product: {
        resource_pk: 1,
        public_id: "mozilla-concrete-brick",
      },
      currency: "USD",
      amount: "10.00",
      uuid: "bt-b-cLt3FD",
      type: 0,
      status: 2,
      resource_uri:"/generic/transaction/1/"
    },
    created: "2015-08-07T14:53:23.966",
    modified: "2015-08-07T14:53:23.966",
    resource_pk: 1,
    resource_uri: "/braintree/mozilla/transaction/1/",
    subscription: "/braintree/mozilla/subscription/1/"
  }];
}


describe('transactionActions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function getApiResult({fetchResult} = {}) {
    var data = {
      transactions: transactionData()
    };

    var opt = {
      returnedData: data,
    };
    if (fetchResult) {
      opt.result = fetchResult;
    }

    return {
      fakeFetch: helpers.fakeFetch(opt),
      data: data,
    }
  }

  function getUserTransactions({apiResult} = {}) {
    if (!apiResult) {
      apiResult = getApiResult();
    }
    var deferredAction = transactionActions.getUserTransactions(
      apiResult.fakeFetch
    );
    helpers.doApiAction(deferredAction, dispatchSpy);
  }

  describe('getUserTransactions', function() {

    it('should dispatch LOADING_USER_TRANSACTIONS', function() {
      getUserTransactions();
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.LOADING_USER_TRANSACTIONS);
    });

    it('should dispatch GOT_USER_TRANSACTIONS', function() {
      getUserTransactions();
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.GOT_USER_TRANSACTIONS);
    });

    it('should dispatch transaction data', function() {
      var apiResult = getApiResult();
      getUserTransactions({apiResult: apiResult});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.transactions, apiResult.data.transactions);
    });

    it('should dispatch an app error', function() {
      var apiResult = getApiResult({
        fetchResult: 'fail',
      });
      getUserTransactions({apiResult: apiResult});
      var action = dispatchSpy.secondCall.args[0];
      assert.deepEqual(action,
                       appActions.error('failed to get transactions'));
    });

  });

  describe('processPayment', function() {

    var fakeCreateSubscription;
    var fakePayOnce;

    beforeEach(function() {
      dispatchSpy = sinon.spy();
      fakeCreateSubscription = sinon.spy();
      fakePayOnce = sinon.spy();
    });

    function processPayment({productId='mozilla-concrete-brick',
                             client=helpers.FakeBraintreeClient,
                             creditCard=fakeCreditCard,
                             createSubscription=fakeCreateSubscription,
                             payOnce=fakePayOnce,
                             ...args}) {
      var deferredAction = transactionActions.processPayment({
        productId: productId,
        creditCard: creditCard,
        braintreeToken: 'braintree-token',
        BraintreeClient: client,
        createSubscription: createSubscription,
        payOnce: payOnce,
        ...args,
      });

      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should create a subscription for recurring products', function() {
      processPayment({productId: 'mozilla-concrete-brick'});

      assert.ok(fakeCreateSubscription.called);
      var args = fakeCreateSubscription.firstCall.args[0];
      assert.equal(args.dispatch, dispatchSpy);
      assert.equal(args.productId, 'mozilla-concrete-brick');
      assert.equal(args.payNonce, 'some-nonce');
    });

    it('should create a sale for one-off products', function() {
      processPayment({productId: 'mozilla-foundation-donation'});

      assert.ok(fakePayOnce.called);
      var args = fakePayOnce.firstCall.args[0];
      assert.equal(args.dispatch, dispatchSpy);
      assert.equal(args.productId, 'mozilla-foundation-donation');
      assert.equal(args.payNonce, 'some-nonce');
    });

    it('should pass amount to pay processor', function() {
      processPayment({productId: 'mozilla-foundation-donation',
                      userDefinedAmount: '10.00'});
      var args = fakePayOnce.firstCall.args[0];
      assert.equal(args.userDefinedAmount, '10.00');
    });

    it('should pass pay method URI to pay processor', function() {
      var payMethodUri = '/some/paymethod/123';
      processPayment({creditCard: null, payMethodUri: payMethodUri});
      var args = fakeCreateSubscription.firstCall.args[0];
      assert.equal(args.payMethodUri, payMethodUri);
    });

    it('should throw error for missing pay method', function() {
      assert.throws(() => {
        processPayment({payMethodUri: null, creditCard: null});
      }, Error, /Either creditCard or payMethodUri is required/);
    });
  });

  describe('processOneTimePayment', function() {
    var defaultProductId = 'mozilla-foundation-donation';
    var fakeFetch;

    beforeEach(function() {
      fakeFetch = helpers.fakeFetch();
    });

    function processOneTimePayment({fetch=fakeFetch,
                                    userDefinedAmount='10.00',
                                    productId=defaultProductId,
                                    client=helpers.FakeBraintreeClient,
                                    payNonce='braintree-pay-nonce',
                                    getState=helpers.getAppStateWithCSRF,
                                    payMethodUri} = {}) {
      transactionActions._processOneTimePayment({
        dispatch: dispatchSpy,
        userDefinedAmount: userDefinedAmount,
        getState: getState,
        productId: productId,
        payNonce: payNonce,
        payMethodUri: payMethodUri,
        fetch: fetch,
      });
    }

    it('should create a sale with basic data', function() {
      var userDefinedAmount = '5.00';

      processOneTimePayment({
        userDefinedAmount: userDefinedAmount,
      });

      assert.equal(fakeFetch.firstCall.args[0].url, '/braintree/sale/');

      var data = fakeFetch.firstCall.args[0].data;
      assert.equal(data.amount, userDefinedAmount);
      assert.equal(data.product_id, defaultProductId);
    });

    it('should pay with a nonce if provided', function() {
      processOneTimePayment({
        payNonce: 'some-nonce', payMethodUri: null,
      });

      var data = fakeFetch.firstCall.args[0].data;
      assert.equal(data.nonce, 'some-nonce');
    });

    it('should post a pay method URI', function() {
      var payMethodUri = '/some/paymethod/123';

      processOneTimePayment({
        payNonce: null,
        payMethodUri: payMethodUri,
      });

      var data = fakeFetch.firstCall.args[0].data;
      assert.equal(data.paymethod, payMethodUri);
      assert.equal(data.nonce, undefined);
    });

    it('should dispatch an error action with card', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      processOneTimePayment({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error action with payMethodURI', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      processOneTimePayment({fetch: fetch, payNonce: null,
                             payMethodUri: '/some/paymethod/123'});

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
    });

  });

});
