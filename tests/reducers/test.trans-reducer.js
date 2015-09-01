import * as actionTypes from 'constants/action-types';
import * as transactionActions from 'actions/transaction';
import * as reducers from 'reducers';
import { initialTransState } from 'reducers/transaction';


describe('Transaction Reducer', function() {

  it('should initialize a transaction', function() {
    var trans = reducers.transaction(undefined, {});
    assert.deepEqual(trans, initialTransState);
  });

  it('should handle completed transactions', function() {
    var trans = reducers.transaction(undefined, transactionActions.complete());
    assert.deepEqual(trans, Object.assign({}, initialTransState, {
      completed: true,
    }));
  });

  it('should store an optional email on completion', function() {
    var email = 'someone@somewhere.org';
    var trans = reducers.transaction(
      undefined,
      transactionActions.complete({userEmail: email})
    );
    assert.deepEqual(trans, Object.assign({}, initialTransState, {
      completed: true,
      userEmail: email,
    }));
  });

  it('should set available methods to user saved pay methods', function() {
    var payMethods = [{type: 'Visa'}];

    var trans = reducers.transaction(undefined, {
      type: actionTypes.USER_SIGNED_IN,
      user: {
        payMethods: payMethods,
      },
    });

    assert.deepEqual(trans, Object.assign({}, initialTransState, {
      availablePayMethods: payMethods,
    }));
  });

});
