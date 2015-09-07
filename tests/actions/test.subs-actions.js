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
      assert.equal(action.type, actionTypes.LOADING_USER_SUBS);
    });

    it('should dispatch user subscription action', function() {
      var { fetch } = setApiResult();
      getUserSubscriptions(fetch);

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.GOT_USER_SUBS);
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
                                 ...allParams} = {}) {
      subActions._createSubscription({
        dispatch: dispatchSpy,
        getState: getState,
        productId: 'product-id',
        payNonce: payNonce,
        fetch: fetch,
        ...allParams,
      });
    }

    it('should dispatch a completion action', function() {
      createSubscription();

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, transactionActions.complete());
    });

    it('should dispatch an email in the completion action', function() {
      var email = 'someone@somewhere.org';
      createSubscription({email: email});

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(
        action,
        transactionActions.complete({userEmail: email})
      );
    });

    it('should send amount data when passed userDefinedAmount', function() {
       createSubscription({userDefinedAmount: '10.00'});
       assert.equal(fakeFetch.firstCall.args[0].data.amount, '10.00');
    });

    it('should send email data when passed an email', function() {
       createSubscription({email: 'trainee@yak-shavers.org'});
       assert.equal(fakeFetch.firstCall.args[0].data.email,
                    'trainee@yak-shavers.org');
    });

    it('should dispatch card submission errors', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {
          status: 400,
          responseJSON: apiError,
        },
      });
      createSubscription({fetch: fetch});

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

    it('should dispatch an already subscribed error', function() {
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {
          status: 400,
          responseJSON: {
            error_response: {
              __all__: [
                'user is already subscribed to this product',
              ],
            },
          },
        },
      });
      createSubscription({fetch: fetch});
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
      assert.include(action.error.userMessage, 'User is already subscribed');
    });

    it('should dispatch a generic error', function() {
      var fetch = helpers.fakeFetch({
        result: 'fail',
      });
      createSubscription({fetch: fetch});
      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
      assert.include(action.error.debugMessage, 'Subscription creation failed');
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


  describe('getSubsByPayMethod', function() {

    var fakeFetch;

    beforeEach(function() {
      dispatchSpy = sinon.spy();
      fakeFetch = helpers.fakeFetch({
        returnedData: {
          subscriptions: [
            {
              'id': 1,
              'paymethod': '/pay-method/2/',
            }, {
              'id': 2,
              'paymethod': '/pay-method/3/',
            }, {
              'id': 2,
              'paymethod': '/pay-method/2/',
            },
          ],
        },
      });
    });

    function getSubsByPayMethod({payMethodUri, fetch=fakeFetch}) {
      var deferredAction = subActions.getSubsByPayMethod(payMethodUri, fetch);
      helpers.doApiAction(deferredAction, dispatchSpy);
    }

    it('should dispatch a GOT_SUBS_BY_PAY_METHOD', function() {
      getSubsByPayMethod({payMethodUri: '/pay-method/2/'});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, 'GOT_SUBS_BY_PAY_METHOD');
    });

    it('should provide 2 matching subs', function() {
      getSubsByPayMethod({payMethodUri: '/pay-method/2/'});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.subscriptions.length, 2);
    });

    it('should provide 1 matching sub', function() {
      getSubsByPayMethod({payMethodUri: '/pay-method/3/'});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.subscriptions.length, 1);
    });

    it('should provide zero matching subs', function() {
      getSubsByPayMethod({payMethodUri: '/pay-method/4/'});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.subscriptions.length, 0);
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var fetch = helpers.fakeFetch({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      getSubsByPayMethod({payMethodUri: '/pay-method/2/', fetch: fetch});
      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.APP_ERROR);
    });

  });

});
