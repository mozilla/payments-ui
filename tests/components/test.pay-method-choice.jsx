import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { PayMethodChoice } from 'components/pay-method-choice';

import * as helpers from '../helpers';


const cards = [
  'amex',
  'discover',
  'jcb',
  'maestro',
  'mastercard',
  'visa',
];

const payMethodData = [{
    id: 1,
    resource_uri: '/braintree/mozilla/paymethod/1/',
    truncated_id: '4444',
    type_name: 'MasterCard',
  }, {
    id: 2,
    resource_uri: '/braintree/mozilla/paymethod/2/',
    truncated_id: '1111',
    type_name: 'Visa',
  }, {
    id: 3,
    resource_uri: '/braintree/mozilla/paymethod/3/',
    truncated_id: '0000',
    type_name: 'Maestro',
  }, {
    id: 4,
    resource_uri: '/braintree/mozilla/paymethod/4/',
    truncated_id: '0000',
    type_name: 'JCB',
  }, {
    id: 5,
    resource_uri: '/braintree/mozilla/paymethod/5/',
    truncated_id: '0000',
    type_name: 'Discover',
  }, {
    id: 6,
    resource_uri: '/braintree/mozilla/paymethod/6/',
    truncated_id: '8431',
    type_name: 'American-Express',
  },
];

const singlePayMethodData = [payMethodData[0]];


describe('Pay Method Choice (List)', function() {

  beforeEach(function() {
    var fakeProcessing = {};
    this.PayMethodChoice = TestUtils.renderIntoDocument(
      <PayMethodChoice
        payMethods={payMethodData}
        cssModifier="whatevar-modifier"
        processing={fakeProcessing}
      />
    );
    sinon.spy(this.PayMethodChoice, 'setState');
  });

  afterEach(function() {
    this.PayMethodChoice.setState.restore();
  });

  function testCardType(cardType) {
    return function() {
      var cardIcon = helpers.findByClass(
        this.PayMethodChoice, 'pmtype-' + cardType);
      assert.notEqual(cardIcon, null);
    };
  }

  cards.forEach(function(card) {
    it('displays each card type ' + card, testCardType(card));
  });

  it('updates checked property when card is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/5/',
      },
    };
    this.PayMethodChoice.handlePayMethodChange(event);
    var input = TestUtils.scryRenderedDOMComponentsWithTag(
      this.PayMethodChoice, 'input')[4];
    assert.equal(input.props.checked, true);
  });

  it('updates state when pay method is selected', function() {
    var event = {
      target: {
        value: 'whatevar',
      },
    };
    this.PayMethodChoice.handlePayMethodChange(event);
    assert.ok(this.PayMethodChoice.setState.calledWith({
      payMethod: 'whatevar',
    }), 'setState should be called');
  });

  it('has a disabled button when no pay method is selected', function() {
    var submitButton = helpers.findByTag(this.PayMethodChoice, 'button');
    assert.notEqual(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

  it('has the submit button enabled when selection is made', function() {
    var submitButton = helpers.findByTag(this.PayMethodChoice, 'button');
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/6/',
      },
    };
    this.PayMethodChoice.handlePayMethodChange(event);
    assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

  it('has a modifer classname passed to card-list', function() {
    var payMethod = helpers.findByClass(
      this.PayMethodChoice, 'pay-method-list');
    assert.include(React.findDOMNode(payMethod).className.split(' '),
                   'whatevar-modifier');
  });

});


describe('Single Pay Method (List)', function() {

  beforeEach(function() {
    var fakeProcessing = {};
    this.PayMethodChoice = TestUtils.renderIntoDocument(
      <PayMethodChoice
        payMethods={singlePayMethodData}
        processing={fakeProcessing}
      />
    );
  });

  it('has the card selected with a single pay method', function() {
    var input = helpers.findByTag(this.PayMethodChoice, 'input');
    assert.equal(input.getDOMNode().getAttribute('checked'), '');
  });

  it('has the submit button enabled with a single pay method', function() {
    var submitButton = helpers.findByTag(this.PayMethodChoice, 'button');
    assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

});


describe('Pay Method Choice (DropDown)', function() {

  beforeEach(function() {
    var fakeProcessing = {};
    this.PayMethodChoice = TestUtils.renderIntoDocument(
      <PayMethodChoice
        payMethods={payMethodData}
        processing={fakeProcessing}
        useDropDown
      />
    );
  });

  it('displays a drop-down with 6 options', function() {
    assert.equal(
      helpers.findAllByTag(this.PayMethodChoice, 'select').length, 1);
    assert.equal(helpers.findAllByTag(this.PayMethodChoice, 'option').length,
                 payMethodData.length);
  });

  it('has a submit button enabled by default', function() {
    var submitButton = helpers.findByTag(this.PayMethodChoice, 'button');
    assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

});


describe('Single Pay Method (DropDown)', function() {

  beforeEach(function() {
    var fakeProcessing = {};
    this.PayMethodChoice = TestUtils.renderIntoDocument(
      <PayMethodChoice
        payMethods={singlePayMethodData}
        processing={fakeProcessing}
        useDropDown
      />
    );
  });

  it('has selected the option when just one pay method', function() {
    var option = helpers.findByTag(this.PayMethodChoice, 'select');
    assert.equal(option.getDOMNode().options.selectedIndex, 0);
  });

  it('has the submit button enabled', function() {
    var submitButton = helpers.findByTag(this.PayMethodChoice, 'button');
    assert.equal(submitButton.getDOMNode().getAttribute('disabled'), null);
  });

});
