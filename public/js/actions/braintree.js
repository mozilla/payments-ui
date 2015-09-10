import braintree from 'braintree-web';

import * as appActions from './app';


export function tokenizeCreditCard({dispatch, braintreeToken, creditCard,
                                    callback,
                                    BraintreeClient=braintree.api.Client}) {

  if (typeof creditCard.number === 'undefined' ||
      typeof creditCard.cvv === 'undefined' ||
      typeof creditCard.expiration === 'undefined') {
    console.error('not a complete card object:', creditCard);
    throw new Error('Invalid card object');
  }

  var client = new BraintreeClient({
    clientToken: braintreeToken,
  });

  client.tokenizeCard({
    number: creditCard.number,
    expirationDate: creditCard.expiration,
    cvv: creditCard.cvv,
  }, (err, nonce) => {
    if (err) {
      console.error('Braintree tokenization error:', err);
      dispatch(appActions.error('Braintree tokenization error'));
    } else {
      callback(nonce);
    }
  });
}
