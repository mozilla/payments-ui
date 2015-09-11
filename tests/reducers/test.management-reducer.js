import * as actionTypes from 'constants/action-types';
import { default as management, initialMgmtState } from 'reducers/management';


describe('management reducer', () => {

  it('sets a default view on sign-in', () => {
    assert.deepEqual(
      management(null, {type: actionTypes.USER_SIGNED_IN}),
      Object.assign({}, initialMgmtState, {
        tab: 'profile',
        view: actionTypes.SHOW_MY_ACCOUNT,
      })
    );
  });

  it('preserves view state on sign-in', () => {
    var existingState = Object.assign({}, initialMgmtState, {
      tab: 'pay-methods',
      view: actionTypes.SHOW_PAY_METHODS,
    });
    assert.deepEqual(
      management(existingState, {type: actionTypes.USER_SIGNED_IN}),
      existingState
    );
  });

  it('resets view state when showing sign-in', () => {
    var existingState = Object.assign({}, initialMgmtState, {
      tab: 'pay-methods',
      view: actionTypes.SHOW_PAY_METHODS,
    });
    assert.deepEqual(
      management(existingState, {type: actionTypes.SHOW_SIGN_IN}),
      initialMgmtState
    );
  });

  it('stores card submission errors', () => {
    var apiError = {error_response: 'invalid monkey name'};
    var state = Object.assign({}, initialMgmtState, {
      type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS,
      cardSubmissionErrors: apiError,
    });
    assert.deepEqual(state.cardSubmissionErrors, apiError);
  });

  it('preserves tab on error', () => {
    var existingState = Object.assign({}, initialMgmtState, {
      tab: 'pay-methods',
    });
    assert.strictEqual(
      management(existingState,
                 {type: actionTypes.CREDIT_CARD_SUBMISSION_ERRORS}).tab,
      existingState.tab);
  });

});
