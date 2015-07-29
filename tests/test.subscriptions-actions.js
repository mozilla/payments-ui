import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as purchaseActions from 'actions/purchase';
import * as subActions from 'actions/subscriptions';

import * as helpers from './helpers';


describe('subscription actions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  describe('getUserSubscriptions', function() {

    function setApiResult({jqueryOpt={}} = {}) {
      var data = {
        subscriptions: [{}],
      };
      Object.assign(jqueryOpt, {
        returnedData: data,
      });
      var jquery = helpers.fakeJquery(jqueryOpt);
      return {
        jquery: jquery.stub,
        data: data,
      };
    }

    it('should dispatch a loading action', function() {
      var { jquery } = setApiResult();
      subActions.getUserSubscriptions(jquery)(dispatchSpy);

      var action = dispatchSpy.firstCall.args[0];
      assert.equal(action.type, actionTypes.LOADING_USER_SUBSCRIPTIONS);
    });

    it('should dispatch user subscription action', function() {
      var { jquery } = setApiResult();
      subActions.getUserSubscriptions(jquery)(dispatchSpy);

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.type, actionTypes.GOT_USER_SUBSCRIPTIONS);
    });

    it('should dispatch subscription data', function() {
      var { jquery, data } = setApiResult();
      subActions.getUserSubscriptions(jquery)(dispatchSpy);

      var action = dispatchSpy.secondCall.args[0];
      assert.equal(action.subscriptions, data.subscriptions);
    });

    it('should dispatch app error on failure', function() {
      var { jquery } = setApiResult({jqueryOpt: {result: 'fail'}});
      subActions.getUserSubscriptions(jquery)(dispatchSpy);

      var action = dispatchSpy.secondCall.args[0];
      assert.deepEqual(action,
                       appActions.error('failed to get subscriptions'));
    });

  });

  describe('createSubscription', function() {

    var fakeCard = {number: '411111111111', cvv: '222', expiration: '06/16'};

    class FakeBraintreeClient {
      tokenizeCard(config, callback) {
        console.log('resolving braintree tokenization');
        callback(null, 'some-nonce');
      }
    }

    function createSubscription(jquery) {
      subActions.createSubscription('braintree-token',
                                    'product-id',
                                    fakeCard,
                                    jquery,
                                    FakeBraintreeClient)(dispatchSpy);
    }

    it('should dispatch a purchase complete action', function() {
      var jquery = helpers.fakeJquery();
      createSubscription(jquery.stub);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, purchaseActions.complete());
    });

    it('should dispatch an error action', function() {
      var apiError = {error_response: 'some error'};
      var jquery = helpers.fakeJquery({
        result: 'fail',
        xhrError: {responseJSON: apiError},
      });
      createSubscription(jquery.stub);

      var action = dispatchSpy.firstCall.args[0];
      assert.deepEqual(action, {
        type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
        apiErrorResult: apiError,
      });
    });

  });

});
