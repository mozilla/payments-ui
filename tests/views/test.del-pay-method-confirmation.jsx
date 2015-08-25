import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import $ from 'jquery';
import ConfirmDelPayMethod from 'views/management/confirm-del-pay-method';

import * as helpers from '../helpers';

describe('Confirm Delete Pay Methods', function() {

  beforeEach(function() {

    this.fakePayMethods = [
      {
        'id': 1,
        'resource_uri': '/pay-method/1/',
        'truncated_id': '4321',
        'type_name': 'visa',
      }, {
        'id': 2,
        'resource_uri': '/pay-method/2/',
        'truncated_id': '1234',
        'type_name': 'amex',
      }, {
        'id': 23,
        'resource_uri': '/pay-method/3/',
        'truncated_id': '4321',
        'type_name': 'mastercard',
      },
    ];

    this.fakeSubs = [
      {
        'id': 1,
        'paymethod': '/pay-method/2/',
        'resource_uri': '/sub/1/',
        'seller_product': {
          'external_id': 'mozilla-concrete-mortar',
          'public_id': 'mozilla-concrete-mortar',
          'resource_pk': 1,
          'resource_uri': '/generic/product/1/',
        },
      }, {
        'id': 2,
        'paymethod': '/pay-method/2/',
        'resource_uri': '/sub/2/',
        'seller_product': {
          'external_id': 'mozilla-concrete-brick',
          'public_id': 'mozilla-concrete-brick',
          'resource_pk': 2,
          'resource_uri': '/generic/product/2/',
        },
      },
    ];

    this.delPayMethodStub = sinon.stub();
    this.delPayMethodStub.returns($.Deferred().resolve());

    this.getSubsByPayMethodStub = sinon.stub();
    this.showDelPayMethodStub = sinon.stub();
    this.showPayMethodsStub = sinon.stub();
    this.updateSubPayMethodStub = sinon.stub();

    this.mountView = function(payMethodUri,
                              affectedSubscriptions=this.fakeSubs,
                              payMethods=this.fakePayMethods) {
      return TestUtils.renderIntoDocument(
        <ConfirmDelPayMethod
          affectedSubscriptions={affectedSubscriptions}
          delPayMethod={this.delPayMethodStub}
          getSubsByPayMethod={this.getSubsByPayMethodStub}
          payMethodUri={payMethodUri}
          payMethods={payMethods}
          showDelPayMethod={this.showDelPayMethodStub}
          showPayMethods={this.showPayMethodsStub}
          updateSubPayMethod={this.updateSubPayMethodStub}
        />
      );
    };
  });

  it('should set payMethodUri on state', function() {
    var view = this.mountView('/pay-method/2/');
    assert.equal(view.state.payMethod, this.fakePayMethods[1]);
  });

  it('should render a spinner if null subs', function() {
    var view = this.mountView('/pay-method/2/', null);
    var spinner = helpers.findByClass(view, 'spinner');
    assert.ok(spinner);
  });

  it('should just show delete confirmation when no affected subs', function() {
    var view = this.mountView('/pay-method/2/', []);
    var inputs = helpers.findAllNodesByTag(view, 'input');
    assert.equal(inputs.length, 1, 'should be only one input');
    assert.equal(inputs[0].getAttribute('type'),
                 'hidden', 'input is type=hidden');
    assert.equal(inputs[0].getAttribute('value'),
                 '/pay-method/2/', 'Has correct value');
    var selects = helpers.findAllNodesByTag(view, 'select');
    assert.equal(selects.length, 0, 'There should be no selects');
    assert.ok(helpers.findByClass(view, 'deletion'));
  });

  it('should prompt selection of new pay method', function() {
    var view = this.mountView('/pay-method/2/');
    var inputs = helpers.findAllNodesByTag(view, 'input');
    assert.equal(inputs.length, 1, 'should be only one input');
    assert.equal(inputs[0].getAttribute('type'),
                 'hidden', 'input is type=hidden');
    assert.equal(inputs[0].getAttribute('value'),
                 '/pay-method/2/', 'Has correct value');
    var selects = helpers.findAllNodesByTag(view, 'select');
    assert.equal(selects.length, 1, 'There should be a select');
    var opts = helpers.findAllNodesByTag(view, 'option');
    assert.equal(opts.length, 2);
    assert.equal(opts[0].getAttribute('value'), '/pay-method/1/');
    assert.equal(opts[1].getAttribute('value'), '/pay-method/3/');
  });

  it('should amount to cancellation when no alt pay methods', function() {
    var payMethods = [this.fakePayMethods[1]];
    var view = this.mountView('/pay-method/2/', this.fakeSubs, payMethods);
    var inputs = helpers.findAllNodesByTag(view, 'input');
    assert.equal(inputs.length, 1, 'should be only one input');
    assert.equal(inputs[0].getAttribute('type'),
                 'hidden', 'input is type=hidden');
    assert.equal(inputs[0].getAttribute('value'),
                 '/pay-method/2/', 'Has correct value');
    var selects = helpers.findAllNodesByTag(view, 'select');
    assert.equal(selects.length, 0, 'There should be no selects');
    assert.ok(helpers.findByClass(view, 'cancellation'));
  });

  it('should call delete on simple pay method deletion', function() {
    var view = this.mountView('/pay-method/2/', []);
    var fakeEvent = {
      target: {
        querySelector: function() {
          return null;
        },
      },
      preventDefault: sinon.stub(),
    };
    view.handleSubmit(fakeEvent);
    assert.ok(fakeEvent.preventDefault.called);
    assert.ok(this.delPayMethodStub.calledWith('/pay-method/2/'));
    assert.ok(this.showPayMethodsStub.called,
              'view change should be initiated');
  });

  it('should call delete on pay method when no alt pay methods', function() {
    var payMethods = [this.fakePayMethods[1]];
    var view = this.mountView('/pay-method/2/', this.fakeSubs, payMethods);
    var fakeEvent = {
      target: {
        querySelector: function() {
          return null;
        },
      },
      preventDefault: sinon.stub(),
    };
    view.handleSubmit(fakeEvent);
    assert.ok(fakeEvent.preventDefault.called);
    assert.ok(this.delPayMethodStub.calledWith('/pay-method/2/'));
    assert.ok(this.showPayMethodsStub.called,
              'view change should be initiated');
  });

  it('Should change affected subs and call delete', function() {
    var payMethods = [this.fakePayMethods[1]];
    var view = this.mountView('/pay-method/2/', this.fakeSubs, payMethods);
    var fakeEvent = {
      target: {
        querySelector: function() {
          return {
            selectedIndex: 0,
            options: [{
              value: 'pm-uri',
            }],
          };
        },
      },
      preventDefault: sinon.stub(),
    };
    view.handleSubmit(fakeEvent);
    assert.ok(fakeEvent.preventDefault.called);
    var updateStub = this.updateSubPayMethodStub;
    assert.ok(updateStub.calledTwice);
    assert.ok(updateStub.firstCall.calledWith('/sub/1/', 'pm-uri'),
              'args should be correct in first call');
    assert.ok(updateStub.secondCall.calledWith('/sub/2/', 'pm-uri'),
              'args should be correct in second call');
    assert.ok(this.delPayMethodStub.calledWith('/pay-method/2/'));
    assert.ok(this.showPayMethodsStub.called,
              'view change should be initiated');
  });
});
