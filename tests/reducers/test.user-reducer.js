import * as actionTypes from 'constants/action-types';
import * as reducers from 'reducers';

import { defaults as defaultUser } from 'reducers/user';


describe('User Reducer', function() {

  function userData() {
    return Object.assign({}, defaultUser, {
      signedIn: true,
      email: 'f@f.com',
      payment_methods: [{provider_id: '1234'}],
    });
  }

  function userSignedIn(user) {
    user = user ? Object.assign({}, defaultUser, user) : userData();
    return {
      type: actionTypes.USER_SIGNED_IN,
      user: user,
    };
  }

  it('should initialize an empty user', function() {
    var user = reducers.user(undefined, {});
    assert.deepEqual(user, defaultUser);
  });

  it('should return a user on sign-in', function() {
    var dispatchedUser = userData();
    var user = reducers.user({}, userSignedIn());
    assert.deepEqual(user, dispatchedUser);
  });

  it('should add a braintreeToken', function() {
    var user = reducers.user({}, {
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      user: {
        braintreeToken: 'bt-token',
      },
    });
    assert.deepEqual(user,
      Object.assign({}, defaultUser, { braintreeToken: 'bt-token'}));
  });

  it('should maintain state when braintreeToken is added', function() {
    var state = {};
    state.user = reducers.user(state.user, userSignedIn());
    var user = reducers.user(state.user, {
      type: actionTypes.GOT_BRAINTREE_TOKEN,
      user: {
        braintreeToken: 'bt-token',
      },
    });
    assert.deepEqual(user,
      Object.assign({}, userData(), { braintreeToken: 'bt-token'}));
  });

  it('should reset a user on sign-out', function() {
    // Receive a sign-in action.
    var state = {};
    state.user = reducers.user(state.user, userSignedIn());

    // Receive a sign-out but pass in the previous signed-in state too.
    var user = reducers.user(state.user, {
      type: actionTypes.USER_SIGNED_OUT,
    });
    assert.deepEqual(user, defaultUser);
  });

  it('should preserve user state', function() {
    var dispatchedUser = userData();
    var state = {};

    // Receive a user action:
    state.user = reducers.user(state.user, userSignedIn());

    // Receive and ignore another action:
    state.user = reducers.user(state.user, {});
    assert.deepEqual(state.user, dispatchedUser);
  });

});
