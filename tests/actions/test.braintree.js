import * as braintreeActions from 'actions/braintree';
import * as errorCodes from 'constants/error-codes';

import * as helpers from '../helpers';


const fakeCreditCard = {
  number: '411111111111',
  cvv: '222',
  expiration: '06/16',
};


describe('braintreeActions', function() {
  var dispatchSpy;

  beforeEach(function() {
    dispatchSpy = sinon.spy();
  });

  function tokenizeCreditCard({dispatch=dispatchSpy,
                               braintreeToken='braintree-token',
                               creditCard=fakeCreditCard,
                               BraintreeClient=helpers.FakeBraintreeClient,
                               callback=() => {}} = {}) {
    braintreeActions.tokenizeCreditCard({dispatch: dispatch,
                                         braintreeToken: braintreeToken,
                                         creditCard: creditCard,
                                         callback: callback,
                                         BraintreeClient: BraintreeClient});
  }

  describe('tokenizeCreditCard', function() {

    it('should tokenize a credit card', function() {
      var tokenizeSpy = sinon.spy();
      class FakeClient {
        tokenizeCard = tokenizeSpy;
      }

      tokenizeCreditCard({BraintreeClient: FakeClient});

      var request = tokenizeSpy.firstCall.args[0];
      assert.equal(request.number, fakeCreditCard.number);
      assert.equal(request.expirationDate, fakeCreditCard.expiration);
      assert.equal(request.cvv, fakeCreditCard.cvv);
    });

    it('should call back with pay method nonce', function() {
      var callbackSpy = sinon.spy();
      tokenizeCreditCard({callback: callbackSpy});
      assert.equal(callbackSpy.firstCall.args[0], 'some-nonce');
    });

    it('should throw with a bad card', function() {

      // Bad card with missing cvv
      // and expiration.
      var fakeBadCard = {
        number: '411111111111',
      };

      assert.throws(() => {
        tokenizeCreditCard({creditCard: fakeBadCard});
      }, Error, /Invalid card object/);
    });

    it('should dispatch an error on tokenization failure', function() {
      tokenizeCreditCard({BraintreeClient: helpers.FakeBraintreeClientError});
      var action = dispatchSpy.firstCall.args[0];
      helpers.assertNotificationErrorCode(
        action, errorCodes.BRAINTREE_TOKENIZATION_ERROR);
    });

  });

});
