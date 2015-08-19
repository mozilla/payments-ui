import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as transactionActions from 'actions/transaction';
import * as subActions from 'actions/subscriptions';

import * as helpers from '../helpers';


describe('subscription actions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  describe('getUserSubscriptions', function() {

    function setApiResult({fetchOpt={}} = {}) {
      var data = {
        subscriptions: [{}],
      };
      fetchOpt.returnedData = data;
      var fetch = helpers.fakeFetch(fetchOpt);
      return {
        fetch: fetch,
        data: data,
      };
    }

    function getUserSubscriptions(fetch) {
      var deferredAction = subActions.getUserSubscriptions(fetch);
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should dispatch a loading action', function() {
      var { fetch } = setApiResult();
      getUserSubscriptions(fetch);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.LOADING_USER_SUBSCRIPTIONS);
    });

    it('should dispatch user subscription action', function() {
      var { fetch } = setApiResult();
      getUserSubscriptions(fetch);

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.GOT_USER_SUBSCRIPTIONS);
    });

    it('should dispatch subscription data', function() {
      var { fetch, data } = setApiResult();
      getUserSubscriptions(fetch);

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.subscriptions, data.subscriptions);
    });

    it('should dispatch app error on failure', function() {
      var { fetch } = setApiResult({fetchOpt: {result: 'fail'}});
      getUserSubscriptions(fetch);

      var action = dispatchSpy.secondCall.args[0];
      assert.deepEqual(action,
                       appActions.error('failed to get subscriptions'));
    });

  });

  describe('createSubscription', function() {

    var fakeCard = {
      number: '411111111111',
      cvv: '222',
      expiration: '06/16',
    };

    // Bad card with missing cvv
    // and expiration.
    var fakeBadCard = {
      number: '411111111111',
    };

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

    function createSubscription(fetch, client=FakeBraintreeClient,
                                payMethod=fakeCard) {
      var deferredAction = subActions.createSubscription(
                                          'product-id',
                                          payMethod,
                                          'braintree-token',
                                          fetch,
                                          client);

      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should dispatch a completion action', function() {
      var fetch = helpers.fakeFetch();
      createSubscription(fetch);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, transactionActions.complete());
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      createSubscription(fetch);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an error action with payMethodUri', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      createSubscription(fetch, FakeBraintreeClient,
                         'fake-pay-method-uri');
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
    });

    it('should dispatch an error on tokenization failure', function() {
      var fetch = helpers.fakeFetch();
      createSubscription(fetch, FakeBraintreeClientError);
      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action,
                       appActions.error('Braintree tokenization error'));
    });

    it('should throw with a bad card', function() {
      assert.throws(() => {
        var fetch = helpers.fakeFetch();
        createSubscription(fetch, FakeBraintreeClient, fakeBadCard);
      }, Error, /Invalid card object/);
    });

    it('should throw with unrecognized pay method', function() {
      assert.throws(() => {
        var fetch = helpers.fakeFetch();
        var invalidPayMethod = 999;
        createSubscription(fetch, FakeBraintreeClient, invalidPayMethod);
      }, Error, /Unrecognized payMethod/);
    });

  });

});
