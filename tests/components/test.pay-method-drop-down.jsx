import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import PayMethodDropDown from 'components/pay-method-drop-down';

import * as helpers from '../helpers';


describe('Pay Method Dropdown', function() {

  var payMethods = [{
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
  }];

  beforeEach(function() {
    this.onPayMethodChange = sinon.stub();
    this.PayMethodDropDown = TestUtils.renderIntoDocument(
      <PayMethodDropDown
        onPayMethodChange={this.onPayMethodChange}
        payMethods={payMethods}
      />
    );
    sinon.spy(this.PayMethodDropDown, 'setState');
  });

  afterEach(function() {
    if (this.PayMethodDropDown.setState.restore) {
      this.PayMethodDropDown.setState.restore();
    }
  });

  it('has expected content when pay method is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/3/',
        selectedIndex: 3, // This is 3 because of the default option.
        options: helpers.findAllNodesByTag(this.PayMethodDropDown, 'option'),
      },
    };
    this.PayMethodDropDown.handleChange(event);
    var content = helpers.findByClass(this.PayMethodDropDown, 'content');
    assert.include(findDOMNode(content).innerHTML, 'maestro');
    assert.include(findDOMNode(content).innerHTML, '0000');
  });

  it('adds pay-method icon when pay-method is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/1/',
        selectedIndex: 1, // This is 1 because of the default option.
        options: helpers.findAllNodesByTag(this.PayMethodDropDown, 'option'),
      },
    };
    this.PayMethodDropDown.handleChange(event);
    var payMethodIcon = helpers.findByClass(
      this.PayMethodDropDown, 'pay-method-icon');
    assert.include(
      findDOMNode(payMethodIcon).className.split(' '), 'pmtype-mastercard');
  });

  it('updates internal state when pay method is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/2/',
        selectedIndex: 2, // This is 2 because of the default option.
        options: helpers.findAllNodesByTag(this.PayMethodDropDown, 'option'),
      },
    };
    this.PayMethodDropDown.handleChange(event);
    assert.ok(this.PayMethodDropDown.setState.calledWith({
      selectedText: '●●●● ●●●● ●●●● 1111',
      selectedPayMethodType: 'visa',
    }), 'setState should be called');
  });

  it('calls onPayMethodChange prop when pay method is selected', function() {
    var event = {
      target: {
        value: '/braintree/mozilla/paymethod/2/',
        selectedIndex: 2, // This is 2 because of the default option.
        options: helpers.findAllNodesByTag(this.PayMethodDropDown, 'option'),
      },
    };
    this.PayMethodDropDown.handleChange(event);
    assert.ok(this.onPayMethodChange.calledWith(event),
              'onPayMethodChange prop should be called');
  });

  it('adds active class when focused', function() {
    this.PayMethodDropDown.handleFocus();
    var wrapper = findDOMNode(this.PayMethodDropDown);
    assert.include(wrapper.className.split(' '), 'active');
  });

  it('removes active class when blurred', function() {
    this.PayMethodDropDown.handleFocus();
    this.PayMethodDropDown.handleBlur();
    var wrapper = findDOMNode(this.PayMethodDropDown);
    assert.notInclude(wrapper.className.split(' '), 'active');
  });

  it('has a default option by default', function() {
    this.PayMethodDropDown = TestUtils.renderIntoDocument(
      <PayMethodDropDown
        payMethods={payMethods}
        onPayMethodChange={this.onPayMethodChange}
      />
    );
    var defaultOption = this.PayMethodDropDown.refs._default;
    assert.ok(TestUtils.isDOMComponent(defaultOption));
  });

  it('removes default option when showDefaultOption is false', function() {
    this.PayMethodDropDown = TestUtils.renderIntoDocument(
      <PayMethodDropDown
        payMethods={payMethods}
        onPayMethodChange={this.onPayMethodChange}
        showDefaultOption={false}
      />
    );
    var defaultOption = this.PayMethodDropDown.refs.def;
    assert.equal(defaultOption, null);
    var content = helpers.findByClass(this.PayMethodDropDown, 'content');
    // As there's no "Please select" the fakeselect over the top
    // of the real one should reflect the first option in lieu
    // of a default selection.
    assert.include(findDOMNode(content).innerHTML, 'mastercard');
    assert.include(findDOMNode(content).innerHTML, '4444');
  });

  it('allows a specific pay method to be selected', function() {
    this.PayMethodDropDown = TestUtils.renderIntoDocument(
      <PayMethodDropDown
        payMethods={payMethods}
        onPayMethodChange={this.onPayMethodChange}
        selectedPayMethodResource={payMethods[1].resource_uri}
      />
    );
    var options = helpers.findAllNodesByTag(this.PayMethodDropDown, 'option');
    var selectedOption = {};
    for (var i = 0; i < options.length; i += 1) {
      if (options[i].hasAttribute('selected')) {
        selectedOption = options[i];
        break;
      }
    }
    assert.equal(selectedOption.value,
                 payMethods[1].resource_uri);
    var content = helpers.findByClass(this.PayMethodDropDown, 'content');
    assert.include(findDOMNode(content).innerHTML, 'visa');
    assert.include(findDOMNode(content).innerHTML, '1111');
  });

  it('should find the correct data', function() {
    var selectedPayMethod = this.PayMethodDropDown.getSelectedPayMethod(
      payMethods[1].resource_uri);
    assert.deepEqual(selectedPayMethod, payMethods[1]);
  });

  it('should return the default text if passed empty object', function() {
    var newState = this.PayMethodDropDown.getDisplayData({});
    assert.equal(newState.selectedPayMethodType, null);
    assert.equal(newState.selectedText, 'Please select');
  });

});
