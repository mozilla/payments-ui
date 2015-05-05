require(['require-config'], function() {

  // Main Entry point of the app.
  require([
    'validation'
  ], function(validation){

    'use strict';

    var validate = new validation.Validate();
    console.log('Payment UI Started');

    validate.cardNumber($('.card-number'));
    validate.expiryDate($('.expiration'));
    validate.cvv($('.cvv'));
  });

});
