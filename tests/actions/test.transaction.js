import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as transactionActions from 'actions/transaction';

import * as helpers from '../helpers';


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

});
