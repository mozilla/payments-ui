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

    var fakeFetch;
    beforeEach(function() {
      dispatchSpy = sinon.spy();
      fakeFetch = helpers.fakeFetch();
    });

    function createSubscription({fetch=fakeFetch,
                                 payNonce='braintree-pay-nonce',
                                 getState=helpers.getAppStateWithCSRF,
                                 payMethodUri} = {}) {
      subActions.createSubscription({
        dispatch: dispatchSpy,
        getState: getState,
        productId: 'product-id',
        payNonce: payNonce,
        payMethodUri: payMethodUri,
        fetch: fetch,
      });
    }

    it('should dispatch a completion action', function() {
      createSubscription();

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, transactionActions.complete());
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      createSubscription({fetch: fetch});

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
      createSubscription({fetch: fetch,
                          payNonce: null,
                          payMethodUri: 'fake-pay-method-uri'});
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
    });
  });

});
