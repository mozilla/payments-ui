require(['require-config'], function() {

  // Main Entry point of the app.
  require([
    'formatter',
    'validation'
  ], function(Formatter, validation){

    'use strict';

    var Validate = new validation.Validate();
    console.log('Payment UI Started');

    var $cardField = $('.card-number');
    var $expiryField = $('.expiration');
    var $cvvField = $('.cvv');
    var cardType = null;

    var patterns = {
      'default': {
        card: '{{9999}} {{9999}} {{9999}} {{9999}}',
        code: '{{999}}',
        codeName: 'CVV',
      },
      'american-express': {
        card: '{{9999}} {{999999}} {{99999}}',
        code: '{{9999}}',
        codeName: 'CID',
      },
      'diners-club': {
        card: '{{9999}} {{999999}} {{9999}}',
        code: '{{999}}',
        codeName: 'CVV',
      },
    };

    var formattedCard = new Formatter($cardField[0], {
      'pattern': patterns.default.card,
    });

    var formattedExpiryDate = new Formatter($expiryField[0], {
      'pattern': '{{99}}/{{99}}',
    });

    var formattedCVV = new Formatter($cvvField[0], {
      'pattern': patterns.default.code,
    });

    formattedCard.resetPattern();
    formattedExpiryDate.resetPattern();
    formattedCVV.resetPattern();

    Validate.cardNumber($cardField, onCardTypeChange);
    Validate.expiryDate($expiryField);
    Validate.cvv($cvvField);

    $cardField.on('cardTypeChanged', onCardTypeChange);

    function onCardTypeChange(e, type) {
      var newCardType = type || 'default';
      if (newCardType === cardType) {
        console.log('No-op card type change');
        return;
      } else {
        console.log('Updating card type to', newCardType);
        var pattern = patterns[newCardType] || patterns.default;
        formattedCard.resetPattern(pattern.card);
        formattedCVV.resetPattern(pattern.code);
        $cvvField.attr('placeholder', pattern.codeName);
      }
      cardType = newCardType;
    }

  });
});
