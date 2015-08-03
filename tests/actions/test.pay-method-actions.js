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

    function setApiGetResult({jqueryOpt={}} = {}) {
      Object.assign(jqueryOpt, {
        returnedData: [{type: 'visa'}],
      });
      var jquery = helpers.fakeJquery(jqueryOpt);
      return {
        jquery: jquery.stub,
        data: jqueryOpt.returnedData,
      };
    }

    it('should dispatch user pay_methods action', function() {
      var { jquery } = setApiGetResult();
      payMethodActions.getPayMethods(jquery)(dispatchSpy);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch payMethod data', function() {
      var { jquery, data } = setApiGetResult();
      payMethodActions.getPayMethods(jquery)(dispatchSpy);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.payMethods, data);
    });

    it('should dispatch app error on failure', function() {
      var { jquery } = setApiGetResult({jqueryOpt: {result: 'fail'}});
      payMethodActions.getPayMethods(jquery)(dispatchSpy);
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

    function addCreditCard(jquery, client=FakeBraintreeClient) {
      payMethodActions.addCreditCard('braintree-token', fakeCard,
                                    jquery, client)(dispatchSpy);
    }

    function setApiPostResult({jqueryOpt={}} = {}) {
      Object.assign(jqueryOpt, {
        returnedData: {payment_methods: [{type: 'visa'}]},
      });
      var jquery = helpers.fakeJquery(jqueryOpt);
      return {
        jquery: jquery.stub,
        data: jqueryOpt.returnedData,
      };
    }

    it('should dispatch a GOT_PAY_METHODS action', function() {
      var { jquery } = setApiPostResult();
      addCreditCard(jquery);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch payment methods', function() {
      var { jquery, data } = setApiPostResult();
      addCreditCard(jquery);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.payMethods, data.payment_methods);
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var { jquery } = setApiPostResult({jqueryOpt: {
        result: 'fail',
        xhrError: {responseJSON: apiError},
      }});
      addCreditCard(jquery);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error on tokenization failure', function() {
      var { jquery } = setApiPostResult();
      addCreditCard(jquery, FakeBraintreeClientError);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action,
                       appActions.error('Braintree tokenization error'));
    });

  });

  describe('delPayMethod', function() {

    function delPayMethod(payMethodUri, jquery) {
      payMethodActions.delPayMethod(payMethodUri, jquery)(dispatchSpy);
    }

    function setApiPostResult({jqueryOpt={}} = {}) {
      Object.assign(jqueryOpt, {
        returnedData: {payment_methods: [{type: 'visa'}]},
      });
      var jquery = helpers.fakeJquery(jqueryOpt);
      return {
        jquery: jquery.stub,
        data: jqueryOpt.returnedData,
      };
    }

    it('should dispatch a GOT_PAY_METHODS action', function() {
      var { jquery } = setApiPostResult();
      delPayMethod('whatever-uri', jquery);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch an error action on api error', function() {
      var apiError = {error_response: 'some error'};
      var { jquery } = setApiPostResult({jqueryOpt: {
        result: 'fail',
        xhrError: {responseJSON: apiError},
      }});
      delPayMethod('whatever-uri', jquery);
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
