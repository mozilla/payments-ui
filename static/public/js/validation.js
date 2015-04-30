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
    var $cardIconPlaceHolder = $('.card-icon');

    var inputEvents = options.inputEvents || 'input propertychange';

    var validValidationTypes = [
      'number',
      'expirationDate',
      'cvv'
    ];

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

        if (data.card) {
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
      } else if (data.card && data.card.type) {
        $cardIconPlaceHolder.addClass('cctype-' + data.card.type);
      }

      // It's good to go...
      if (data.isValid === true) {
        $elm.removeClass(invalidClass + ' ' + maybeValidClass);
        $elm.addClass(validClass);
      }
    }

    function checkVal($elm, type) {
      if (validValidationTypes.indexOf(type) > -1) {
        var value = $elm.val();
        console.log(value);
        handleValidatonData($elm, cc[type](value));
      } else {
        throw new Error('ValidateType ' + type + 'is invalid');
      }
    }

    function checkFuncFactory(type) {
      return function($elm) {
        $elm.on(inputEvents, function() {
          checkVal($elm, type);
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
