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

    function setApiResult({jqueryOpt={}} = {}) {
      var data = [{type: 'visa'}];
      Object.assign(jqueryOpt, {
        returnedData: data,
      });
      var jquery = helpers.fakeJquery(jqueryOpt);
      return {
        jquery: jquery.stub,
        data: data,
      };
    }

    it('should dispatch user pay_methods action', function() {
      var { jquery } = setApiResult();
      payMethodActions.getPayMethods(jquery)(dispatchSpy);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch payMethod data', function() {
      var { jquery, data } = setApiResult();
      payMethodActions.getPayMethods(jquery)(dispatchSpy);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.payMethods, data);
    });

    it('should dispatch app error on failure', function() {
      var { jquery } = setApiResult({jqueryOpt: {result: 'fail'}});
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

    it('should dispatch a GOT_PAY_METHODS action', function() {
      var jquery = helpers.fakeJquery();
      addCreditCard(jquery.stub);
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.GOT_PAY_METHODS);
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var jquery = helpers.fakeJquery({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      addCreditCard(jquery.stub);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error on tokenization failure', function() {
      var jquery = helpers.fakeJquery();
      addCreditCard(jquery.stub, FakeBraintreeClientError);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action,
                       appActions.error('Braintree tokenization error'));
    });

  });

});
