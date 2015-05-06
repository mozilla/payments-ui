define([
  'exports',
  'card-validator',
  'jquery'
], function(exports, cc, $) {

  'use strict';

  var Validate = function(options) {

    options = options || {};
    var invalidClass = options.invalidClass || 'invalid';
    var maybeValidClass = options.maybeValidClass || 'maybeValid';
    var validClass = options.validClass || 'valid';
    var $cardIconPlaceHolder = $('.card-icon');

    var inputEvents = options.inputEvents || 'input propertychange';

    var validValidationTypes = [
      'number',
      'expirationDate',
      'cvv'
    ];

    var classMapping = {
      'american-express': 'amex',
      'diners-club': 'diners',
      'master-card': 'mastercard',
    };

    // Function to be passed to $.removeClass to remove all
    // classes starting with 'card-'
    function removeCardClasses(index, classes) {
      return classes.split(/\s+/)
        .filter(function (className) {
          return /^cctype-/.test(className);
        }).join(' ');
    }

    function handleValidatonData($elm, data) {
      // It's invalid all bets are off.
      if (data.isPotentiallyValid === false) {
        $elm.addClass(invalidClass);
        $elm.removeClass(maybeValidClass);

        if (typeof data.card !== 'undefined') {
          $cardIconPlaceHolder.removeClass(removeCardClasses);
        }
        return;
      }

      // It's potentially valid. Add a class to show it.
      if (data.isPotentiallyValid === true) {
        $elm.removeClass(invalidClass);
        $elm.addClass(maybeValidClass);
      }

      // Add a card type when detected.
      if (data.card === null) {
        $cardIconPlaceHolder.removeClass(removeCardClasses);
        $elm.trigger('cardTypeChanged');
      } else if (data.card && data.card.type) {
        $cardIconPlaceHolder.removeClass(removeCardClasses);
        var cardType = data.card.type;
        var cardClass = classMapping[cardType] || cardType;
        $cardIconPlaceHolder.addClass('cctype-' + cardClass);
        $elm.trigger('cardTypeChanged', cardType);
      }

      // It's good to go...
      if (data.isValid === true) {
        $elm.removeClass(invalidClass + ' ' + maybeValidClass);
        $elm.addClass(validClass);
      }
    }

    function checkVal($elm, type) {
      if (validValidationTypes.indexOf(type) > -1) {
        handleValidatonData($elm, cc[type]($elm.val()));
      } else {
        throw new Error('ValidateType ' + type + 'is invalid');
      }
    }

    function checkFuncFactory(type) {
      return function($elm) {
        $elm.on('keydown keypress paste', function(e) {
          checkVal($elm, type);
          return true;
        });
        checkVal($elm, type);
        return $elm;
      };
    }

    return {
      cardNumber: checkFuncFactory('number'),
      expiryDate: checkFuncFactory('expirationDate'),
      cvv: checkFuncFactory('cvv'),
    };
  };

  exports.Validate = Validate;

});
