'use strict';

var tracking = require('tracking');


describe('tracking uninitialized', function() {

  beforeEach(function() {
    this.oldTrackingEnabled = tracking.enabled;
    this.oldTrackingInitialized = tracking.initialized;
    tracking.enabled = true;
    tracking.initialized = false;
  });

  afterEach(function() {
    tracking.enabled = this.oldTrackingEnabled;
    tracking.initialized = this.oldTrackingInitialized;
  });

  it('should throw when calling setPage', function() {
    assert.throws(function() {
      tracking.setPage('whatevar');
    }, /Must call init\(\) first/);
  });

  it('should throw when calling sendEvent', function() {
    tracking.initialized = false;
    assert.throws(function() {
      tracking.sendEvent({
        'category': 'cat',
        'action': 'some-action',
      });
    }, /Must call init\(\) first/);
  });

});


describe('tracking functions', function() {

  beforeEach(function() {
    this.oldTrackingInitialized = tracking.initialized;
    this.oldTrackingEnabled = tracking.enabled;
    tracking.enabled = true;
    tracking.initialized = false;
    sinon.stub(tracking, '_ga');
  });

  afterEach(function() {
    tracking.enabled = this.oldTrackingEnabled;
    tracking.initialized = this.oldTrackingInitialized;
    tracking._ga.restore();
  });

  it('should throw if page not set', function() {
    assert.throws(function() {
      tracking.setPage();
    }, Error, /page is required/);
  });

  it('should call _ga', function() {
    tracking.setPage('whatever');
    assert.ok(tracking._ga.called);
  });

  it('should throw if category not set', function() {
    assert.throws(function() {
      tracking.sendEvent({});
    }, Error, /opts\.category is required/);
  });

  it('should throw if action not set', function() {
    assert.throws(function() {
      tracking.sendEvent({
        category: 'whatever',
      });
    }, Error, /opts\.action is required/);
  });

  it('should call _ga', function() {
    tracking.sendEvent({
      category: 'whatever',
      action: 'some-action',
    });
    assert.ok(tracking._ga.called);
  });

});
