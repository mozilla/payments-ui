'use strict';


var CardChoice = require('components/card-choice');

var helpers = require('./helpers');

var React;
var TestUtils;

describe('Card Choice', function() {

  var cards = [
    'amex',
    'discover',
    'jcb',
    'maestro',
    'mastercard',
    'visa',
  ];

  var cardListData = [{
      'id': 1,
      'resource_uri': '/braintree/mozilla/paymethod/1/',
      'truncated_id': '4444',
      'type_name': 'MasterCard',
    }, {
      'id': 2,
      'resource_uri': '/braintree/mozilla/paymethod/2/',
      'truncated_id': '1111',
      'type_name': 'Visa',
    }, {
      'id': 3,
      'resource_uri': '/braintree/mozilla/paymethod/3/',
      'truncated_id': '0000',
      'type_name': 'Maestro',
    }, {
      'id': 4,
      'resource_uri': '/braintree/mozilla/paymethod/4/',
      'truncated_id': '0000',
      'type_name': 'JCB',
    }, {
      'id': 5,
      'resource_uri': '/braintree/mozilla/paymethod/5/',
      'truncated_id': '0000',
      'type_name': 'Discover',
    }, {
      'id': 6,
      'resource_uri': '/braintree/mozilla/paymethod/6/',
      'truncated_id': '8431',
      'type_name': 'American-Express',
    },
  ];

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    this.CardChoice = TestUtils.renderIntoDocument(
      <CardChoice cards={cardListData} />
    );
    sinon.spy(this.CardChoice, 'setState');
  });

  afterEach(function() {
    this.CardChoice.setState.restore();
  });

  function testCardType(cardType) {
    return function() {
      var cardIcon = helpers.findByClass(this.CardChoice, 'cctype-' + cardType);
      assert.notEqual(cardIcon, null);
    };
  }

  cards.forEach(function(card) {
    it('Displays each card type ' + card, testCardType(card));
  });

  it('State is updated when card is selected', function() {
    var event = {
      target: {
        value: 'whatevar',
      },
    };
    this.CardChoice.handleCardChange(event);
    assert.ok(this.CardChoice.setState.calledWith({
      'card': 'whatevar',
    }), 'setState should be called');
  });

  it('Has a disabled button when no card is selected', function() {
    var submitButton = helpers.findByTag(this.CardChoice, 'button');
    assert.notEqual(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

  it('has button enabled when selection is made', function() {
    var submitButton = helpers.findByTag(this.CardChoice, 'button');
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/6/',
      },
    };
    this.CardChoice.handleCardChange(event);
    assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

});

describe('Single Card Choice', function() {

    var cardListData = [{
        'id': 1,
        'resource_uri': '/braintree/mozilla/paymethod/1/',
        'truncated_id': '4444',
        'type_name': 'MasterCard',
       },
     ];

    beforeEach(function() {
      React = require('react');
      TestUtils = require('react/lib/ReactTestUtils');
      this.CardChoice = TestUtils.renderIntoDocument(
        <CardChoice cards={cardListData} />
      );
    });

    it('Has the card selected when just one card', function() {
        var input = helpers.findByTag(this.CardChoice, 'input');
        assert.equal(input.getDOMNode().getAttribute('checked'), '');
    });

    it('Has the submit button enabled when just one card', function() {
      var submitButton = helpers.findByTag(this.CardChoice, 'button');
      assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
    });
});
