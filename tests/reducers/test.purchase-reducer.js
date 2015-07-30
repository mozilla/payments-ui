import * as actionTypes from 'constants/action-types';
import * as purchaseActions from 'actions/purchase';
import * as reducers from 'reducers';

import { initialPurchaseState } from 'reducers/purchase';



describe('Purchase Reducer', function() {

  it('should initialize a purchase', function() {
    var purchase = reducers.purchase(undefined, {});
    assert.deepEqual(purchase, initialPurchaseState);
  });

  it('should handle completed purchases', function() {
    var purchase = reducers.purchase(undefined, purchaseActions.complete());
    assert.deepEqual(purchase, Object.assign({}, initialPurchaseState, {
      completed: true,
    }));
  });

  it('should infer saved payment methods when user signs in', function() {
    var payMethods = [{type: 'Visa'}];

    var purchase = reducers.purchase(undefined, {
      type: actionTypes.USER_SIGNED_IN,
      user: {
        payMethods: payMethods,
      },
    });

    assert.deepEqual(purchase, Object.assign({}, initialPurchaseState, {
      completed: false,
      payMethods: payMethods,
    }));
  });

});
