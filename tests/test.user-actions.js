import * as actionTypes from 'constants/action-types';
import * as appActions from 'actions/app';
import * as userActions from 'actions/user';

import * as helpers from './helpers';


describe('userActions', function() {

  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function fakeSignInResult() {
    return {
      buyer_email: 'person@somehwere.com',
      csrf_token: 'some-csrf-token',
      payment_methods: [],
    };
  }

  function setApiSignInResult(opt) {
    opt = opt || {};
    opt.data = opt.data || fakeSignInResult();

    opt.jqueryOpt = opt.jqueryOpt || {};
    opt.jqueryOpt.returnedData = opt.data;

    var jquery = helpers.fakeJquery(opt.jqueryOpt);

    return {
      data: opt.data,
      jquery: jquery.stub,
    };
  }

  it('should dispatch sign-in action', function() {
    var setup = setApiSignInResult();

    userActions.signIn('access-token', setup.jquery)(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.type, actionTypes.USER_SIGNED_IN);
  });

  it('should set email from sign-in', function() {
    var setup = setApiSignInResult();

    userActions.signIn('access-token', setup.jquery)(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.user.email, setup.data.buyer_email);
  });

  it('should set saved payment methods from sign-in', function() {
    var data = fakeSignInResult();
    var payMethods = [{'provider_id': '3vr3ym'}];
    data.payment_methods = payMethods;
    var setup = setApiSignInResult({data: data});

    userActions.signIn('access-token', setup.jquery)(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.equal(action.user.payment_methods, payMethods);
  });

  it('should set empty payment methods', function() {
    var setup = setApiSignInResult();

    userActions.signIn('access-token', setup.jquery)(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.deepEqual(action.user.payment_methods, []);
  });

  it('should sign-in with access token', function() {
    var jquery = helpers.fakeJquery({returnedData: fakeSignInResult()});
    userActions.signIn('access-token', jquery.stub)(dispatchSpy);

    assert.equal(jquery.ajaxSpy.firstCall.args[0].data.access_token,
                 'access-token');
  });

  it('should configure CSRF headers on sign-in', function() {
    var data = fakeSignInResult();
    var jquery = helpers.fakeJquery({returnedData: data});
    userActions.signIn('access-token', jquery.stub)(dispatchSpy);

    assert.deepEqual(jquery.ajaxSetupSpy.firstCall.args[0].headers,
                     {'X-CSRFToken': data.csrf_token});
  });

  it('should set app error on failure', function() {
    var setup = setApiSignInResult({jqueryOpt: {result: 'fail'}});

    userActions.signIn('access-token', setup.jquery)(dispatchSpy);

    var action = dispatchSpy.firstCall.args[0];
    assert.deepEqual(action, appActions.error('user login failed'));
  });

});
