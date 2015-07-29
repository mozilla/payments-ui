import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as purchaseActions from 'actions/purchase';
import * as reducers from 'reducers';

import { defaults as defaultUser } from 'reducers/user';


describe('app', function() {

  function appWithError() {
    return {
      error: {
        debugMessage: 'some informative message',
      },
    };
  }

  it('should initialize an app', function() {
    var app = reducers.app(undefined, {});
    assert.deepEqual(app, {});
  });

  it('should set an app error', function() {
    var dispatchedApp = appWithError();

    var app = reducers.app(
      {}, appActions.error(dispatchedApp.error.debugMessage));

    assert.deepEqual(app, dispatchedApp);
  });

  it('should preserve app state', function() {
    var dispatchedApp = appWithError();
    var state = {};

    // Receive an error action:
    state.app = reducers.app(
      state, appActions.error(dispatchedApp.error.debugMessage));
    // Receive and ignore some other action:
    state.app = reducers.app(state.app, {});

    assert.deepEqual(state.app, dispatchedApp);
  });

});


describe('user', function() {

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


describe('purchase', function() {

  it('should initialize a purchase', function() {
    var purchase = reducers.purchase(undefined, {});
    assert.deepEqual(purchase, {
      completed: false,
      payment_methods: [],
    });
  });

  it('should handle completed purchases', function() {
    var purchase = reducers.purchase(undefined, purchaseActions.complete());
    assert.deepEqual(purchase, {
      completed: true,
    });
  });

  it('should infer saved payment methods when user signs in', function() {
    var paymentMethods = [{type: 'Visa'}];

    var purchase = reducers.purchase(undefined, {
      type: actionTypes.USER_SIGNED_IN,
      user: {
        payment_methods: paymentMethods,
      },
    });

    assert.deepEqual(purchase, {
      completed: false,
      payment_methods: paymentMethods,
    });
  });

});
