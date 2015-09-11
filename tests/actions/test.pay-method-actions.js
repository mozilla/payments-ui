import * as actionTypes from 'constants/action-types';
import * as errorCodes from 'constants/error-codes';
import * as payMethodActions from 'actions/pay-methods';
import * as processingActions from 'actions/processing';

import * as helpers from '../helpers';


describe('Pay Method Actions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  describe('getPayMethods', function() {

    function setApiGetResult({fetchOpt={}} = {}) {
      fetchOpt.returnedData = [{type: 'visa'}];
      var fetch = helpers.fakeFetch(fetchOpt);
      return {
        fetch: fetch,
        data: fetchOpt.returnedData,
      };
    }

    function getPayMethods(fetch) {
      var deferredAction = payMethodActions.getPayMethods(fetch);
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should dispatch user pay_methods action', function() {
      var { fetch } = setApiGetResult();
      getPayMethods(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch payMethod data', function() {
      var { fetch, data } = setApiGetResult();
      getPayMethods(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.payMethods, data);
    });

    it('should dispatch an error notification on failure', function() {
      var { fetch } = setApiGetResult({fetchOpt: {result: 'fail'}});
      getPayMethods(fetch);
      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.PAY_METHOD_GET_FAILED);
    });

  });


  describe('addCreditCard', function() {

    var fakeCard = {number: '411111111111', cvv: '222', expiration: '06/16'};

    class FakeBraintreeClient {
      tokenizeCard(config, callback) {
        console.log('resolving braintree tokenization');
        callback(null, 'some-nonce');
      }
    }

    class FakeBraintreeClientError {
      tokenizeCard(config, callback) {
        console.log('resolving braintree tokenization with error');
        callback("I'm some error");
      }
    }

    function addCreditCard({fetch, client=FakeBraintreeClient,
                            processingId='some-component-id'}) {
      var deferredAction = payMethodActions.addCreditCard({
        braintreeToken: 'braintree-token',
        creditCard: fakeCard,
        fetch: fetch,
        BraintreeClient: client,
        processingId: processingId,
      });
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    function setApiPostResult({fetchOpt={}} = {}) {
      fetchOpt.returnedData = {payment_methods: [{type: 'visa'}]};
      var fetch = helpers.fakeFetch(fetchOpt);
      return {
        fetch: fetch,
        data: fetchOpt.returnedData,
      };
    }

    it('should begin processing', function() {
      var { fetch } = setApiPostResult();
      var procId = 'some-id';
      addCreditCard({fetch: fetch, processingId: procId});
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, processingActions.beginProcessing(procId));
    });

    it('should stop processing', function() {
      var { fetch } = setApiPostResult();
      var procId = 'some-id';
      addCreditCard({fetch: fetch, processingId: procId});
      var action = dispatchSpy.secondCall.args[0];
      assert.deepEqual(action, processingActions.stopProcessing(procId));
    });

    it('should dispatch a GOT_PAY_METHODS action', function() {
      var { fetch } = setApiPostResult();
      addCreditCard({fetch: fetch});
      var action = dispatchSpy.thirdCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch a SHOW_PAY_METHODS action on success', function() {
      var { fetch } = setApiPostResult();
      addCreditCard({fetch: fetch});
      var action = dispatchSpy.getCall(3).args[0];
      assert.equal(action.type, actionTypes.SHOW_PAY_METHODS);
    });

    it('should dispatch payment methods', function() {
      var { fetch, data } = setApiPostResult();
      addCreditCard({fetch: fetch});
      var action = dispatchSpy.thirdCall.args[0];
      assert.equal(action.payMethods, data.payment_methods);
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var { fetch } = setApiPostResult({fetchOpt: {
        result: 'fail',
        xhrError: {responseJSON: apiError},
      }});
      addCreditCard({fetch: fetch});
      var action = dispatchSpy.thirdCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error on tokenization failure', function() {
      var { fetch } = setApiPostResult();
      addCreditCard({fetch, client: FakeBraintreeClientError});
      var action = dispatchSpy.secondCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.BRAINTREE_TOKENIZATION_ERROR);
    });

  });

  describe('delPayMethod', function() {

    function delPayMethod(payMethodUri, fetch) {
      var deferredAction = payMethodActions.delPayMethod(
        payMethodUri, fetch
      );
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    function setApiPostResult({fetchOpt={}} = {}) {
      fetchOpt.returnedData = {payment_methods: [{type: 'visa'}]};
      var fetch = helpers.fakeFetch(fetchOpt);
      return {
        fetch: fetch,
        data: fetchOpt.returnedData,
      };
    }

    it('should dispatch a GOT_PAY_METHODS action', function() {
      var { fetch } = setApiPostResult();
      delPayMethod('whatever-uri', fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch a SHOW_PAY_METHODS action on success', function() {
      var { fetch } = setApiPostResult();
      delPayMethod('whatever-uri', fetch);
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.SHOW_PAY_METHODS);
    });

    it('should dispatch an error action on api error', function() {
      var apiError = {error_response: 'some error'};
      var { fetch } = setApiPostResult({fetchOpt: {
        result: 'fail',
        xhrError: {responseJSON: apiError},
      }});
      delPayMethod('whatever-uri', fetch);
      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.PAY_METHOD_DELETION_FAILED);
    });

    it('should throw if empty payMethodUri supplied', function() {
      assert.throws(function() {
        delPayMethod(undefined);
      }, Error, /payMethodUri is undefined/);
    });
  });
});
