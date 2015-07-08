'use strict';

var rewire = require('rewire');
var tracking = rewire('tracking');

// Get at the top level var in the tracking module
// using rewire.
var Tracking = tracking.__get__('Tracking');


describe('Tracking uninitialized', function() {

  it('should throw when calling setPage', function() {
    assert.throws(function() {
      var t = new Tracking({enabled: true});
      t.setPage('whatevar');
    }, /Must call init\(\) first/);
  });

  it('should throw when calling sendEvent', function() {
    assert.throws(function() {
      var t = new Tracking({enabled: true});
      t.sendEvent({
        'category': 'cat',
        'action': 'some-action',
      });
    }, /Must call init\(\) first/);
  });

});


describe('Tracking functions', function() {

  beforeEach(function() {
    this.t = new Tracking({
      id: 'whatever',
      enabled: true,
    });
    this.t.initialized = true;
    window.ga = sinon.stub();
  });

  it('should throw if page not set', function() {
    assert.throws(function() {
      this.t.setPage();
    }.bind(this), Error, /page is required/);
  });

  it('should call ga', function() {
    this.t.setPage('whatever');
    assert.ok(window.ga.called);
  });

  it('should throw if category not set', function() {
    assert.throws(function() {
      this.t.sendEvent({});
    }.bind(this), Error, /opts\.category is required/);
  });

  it('should throw if action not set', function() {
    assert.throws(function() {
      this.t.sendEvent({
        category: 'whatever',
      });
    }.bind(this), Error, /opts\.action is required/);
  });

  it('should call _ga', function() {
    this.t.sendEvent({
      category: 'whatever',
      action: 'some-action',
    });
    assert.ok(window.ga.called);
  });

});
