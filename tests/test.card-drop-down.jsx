import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import CardDropDown from 'components/card-drop-down';

import * as helpers from './helpers';


describe('Card Dropdown', function() {

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
  }];

  beforeEach(function() {
    this.onCardChange = sinon.stub();
    this.CardDropDown = TestUtils.renderIntoDocument(
      <CardDropDown cards={cardListData} onCardChange={this.onCardChange} />
    );
    sinon.spy(this.CardDropDown, 'setState');
  });

  afterEach(function() {
    this.CardDropDown.setState.restore();
  });

  it('has expected content when card is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/3/',
        selectedIndex: 3, // This is 3 because of the default option.
        options: helpers.findAllNodesByTag(this.CardDropDown, 'option'),
      },
    };
    this.CardDropDown.handleChange(event);
    var content = helpers.findByClass(this.CardDropDown, 'content');
    assert.include(findDOMNode(content).innerHTML, 'maestro');
    assert.include(findDOMNode(content).innerHTML, '0000');
  });

  it('adds card-icon when card is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/1/',
        selectedIndex: 1, // This is 1 because of the default option.
        options: helpers.findAllNodesByTag(this.CardDropDown, 'option'),
      },
    };
    this.CardDropDown.handleChange(event);
    var cardIcon = helpers.findByClass(this.CardDropDown, 'card-icon');
    assert.include(
      findDOMNode(cardIcon).className.split(' '), 'cctype-mastercard');
  });

  it('updates internal state when card is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/2/',
        selectedIndex: 2, // This is 2 because of the default option.
        options: helpers.findAllNodesByTag(this.CardDropDown, 'option'),
      },
    };
    this.CardDropDown.handleChange(event);
    assert.ok(this.CardDropDown.setState.calledWith({
      selectedText: ' ●●●● ●●●● ●●●● 1111',
      selectedCardType: 'visa',
    }), 'setState should be called');
  });

  it('calls onCardChange prop when card is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/2/',
        selectedIndex: 2, // This is 2 because of the default option.
        options: helpers.findAllNodesByTag(this.CardDropDown, 'option'),
      },
    };
    this.CardDropDown.handleChange(event);
    assert.ok(this.onCardChange.calledWith(event),
              'onCardChange prop should be called');
  });

  it('adds active class when focused', function() {
    this.CardDropDown.handleFocus();
    var wrapper = findDOMNode(this.CardDropDown);
    assert.include(wrapper.className.split(' '), 'active');
  });

  it('removes active class when blurred', function() {
    this.CardDropDown.handleFocus();
    this.CardDropDown.handleBlur();
    var wrapper = findDOMNode(this.CardDropDown);
    assert.notInclude(wrapper.className.split(' '), 'active');
  });

});
