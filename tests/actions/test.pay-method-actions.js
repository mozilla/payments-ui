import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as payMethodActions from 'actions/pay-methods';
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

    it('should dispatch app error on failure', function() {
      var { fetch } = setApiGetResult({fetchOpt: {result: 'fail'}});
      getPayMethods(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action,
                       appActions.error('Retrieving cards failed'));
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

    function addCreditCard(fetch, client=FakeBraintreeClient) {
      var deferredAction = payMethodActions.addCreditCard(
        'braintree-token', fakeCard, fetch, client
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
      addCreditCard(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch a SHOW_PAY_METHODS action on success', function() {
      var { fetch } = setApiPostResult();
      addCreditCard(fetch);
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.SHOW_PAY_METHODS);
    });

    it('should dispatch payment methods', function() {
      var { fetch, data } = setApiPostResult();
      addCreditCard(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.payMethods, data.payment_methods);
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var { fetch } = setApiPostResult({fetchOpt: {
        result: 'fail',
        xhrError: {responseJSON: apiError},
      }});
      addCreditCard(fetch);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error on tokenization failure', function() {
      var { fetch } = setApiPostResult();
      addCreditCard(fetch, FakeBraintreeClientError);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action,
                       appActions.error('Braintree tokenization error'));
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
      assert.deepEqual(action,
                       appActions.error('Deleting pay method failed'));

    });

    it('should throw if empty payMethodUri supplied', function() {
      assert.throws(function() {
        delPayMethod(undefined);
      }, Error, /payMethodUri is undefined/);
    });
  });
});
