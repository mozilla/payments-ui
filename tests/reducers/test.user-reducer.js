import * as actionTypes from 'constants/action-types';
import userReducer from 'reducers/user';

import { initialUserState } from 'reducers/user';


describe('User Reducer', function() {

  function userData() {
    return Object.assign({}, initialUserState, {
      signedIn: true,
      email: 'f@f.com',
      payMethods: [{provider_id: '1234'}],
    });
  }

  function userSignedIn(user) {
    user = user ? Object.assign({}, initialUserState, user) : userData();
    return {
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    };
  }

  it('should initialize an empty user', function() {
    var user = userReducer(undefined, {});
    assert.deepEqual(user, initialUserState);
  });

  it('should return a user on sign-in', function() {
    var dispatchedUser = userData();
    var user = userReducer({}, userSignedIn());
    assert.deepEqual(user, dispatchedUser);
  });

  it('should add a braintreeToken', function() {
    var user = userReducer({}, {
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      braintreeToken: 'bt-token',
    });
    assert.deepEqual(user,
      Object.assign({}, initialUserState, { braintreeToken: 'bt-token'}));
  });

  it('should maintain state when braintreeToken is added', function() {
    var state = {};
    state.user = userReducer(state.user, userSignedIn());
    var user = userReducer(state.user, {
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      braintreeToken: 'bt-token',
    });
    assert.deepEqual(user,
      Object.assign({}, userData(), { braintreeToken: 'bt-token'}));
  });

  it('should reset a user on sign-out', function() {
    // Receive a sign-in action.
    var state = {};
    state.user = userReducer(state.user, userSignedIn());

    // Receive a sign-out but pass in the previous signed-in state too.
    var user = userReducer(state.user, {
      type: actionTypes.USER_SIGNED_OUT,
    });
    assert.deepEqual(user, initialUserState);
  });

  it('should preserve user state', function() {
    var dispatchedUser = userData();
    var state = {};

    // Receive a user action:
    state.user = userReducer(state.user, userSignedIn());

    // Receive and ignore another action:
    state.user = userReducer(state.user, {});
    assert.deepEqual(state.user, dispatchedUser);
  });

  it('should reset subscriptions when loading', function() {
    var existingUser = userData();
    existingUser.subscriptions = [{}];

    var user = userReducer(existingUser, {
      type: actionTypes.LOADING_USER_SUBS,
    });
    assert.equal(user.subscriptions, null);
    // Check that the existing data was preserved too.
    assert.equal(user.email, existingUser.email);
  });

  it('should merge in subscription data', function() {
    var existingUser = userData();
    var data = [{id: 123}];

    var user = userReducer(existingUser, {
      type: actionTypes.GOT_USER_SUBS,
      subscriptions: data,
    });

    assert.equal(user.subscriptions, data);
    // Check that the existing data was preserved too.
    assert.equal(user.email, existingUser.email);
  });

  it('should merge in transaction data', function() {
    var existingUser = userData();
    var data = [{id: 123}];

    var user = userReducer(existingUser, {
      type: actionTypes.GOT_USER_TRANSACTIONS,
      transactions: data,
    });

    assert.equal(user.transactions, data);
    // Check that the existing data was preserved too.
    assert.equal(user.email, existingUser.email);
  });

  it('should reset transactions when loading', function() {
    var existingUser = userData();
    existingUser.transactions = [{}];

    var user = userReducer(existingUser, {
      type: actionTypes.LOADING_USER_TRANSACTIONS,
    });
    assert.equal(user.transactions, null);
    // Check that the existing data was preserved too.
    assert.equal(user.email, existingUser.email);
  });

});
