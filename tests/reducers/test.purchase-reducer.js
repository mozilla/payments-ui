import * as actionTypes from 'constants/action-types';
import * as purchaseActions from 'actions/purchase';
import * as reducers from 'reducers';
import { initialState } from 'reducers/purchase';


describe('Purchase Reducer', function() {

  it('should initialize a purchase', function() {
    var purchase = reducers.purchase(undefined, {});
    assert.deepEqual(purchase, initialState);
  });

  it('should handle completed purchases', function() {
    var purchase = reducers.purchase(undefined, purchaseActions.complete());
    assert.deepEqual(purchase, Object.assign({}, initialState, {
      completed: true,
    }));
  });

  it('should infer saved payment methods when user signs in', function() {
    var paymentMethods = [{type: 'Visa'}];

    var purchase = reducers.purchase(undefined, {
      type: actionTypes.USER_SIGNED_IN,
      user: {
        payment_methods: paymentMethods,
      },
    });

    assert.deepEqual(purchase, Object.assign({}, initialState, {
      completed: false,
      payment_methods: paymentMethods,
    }));
  });

});
