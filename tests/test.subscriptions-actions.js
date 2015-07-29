import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as subActions from 'actions/subscriptions';

import * as helpers from './helpers';


describe('subscription actions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

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

  describe('getUserSubscriptions', function() {

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
});
