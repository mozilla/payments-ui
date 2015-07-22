'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');

var Modal = require('components/modal');

var helpers = require('./helpers');


describe('Modal', function() {

  beforeEach(function() {
    this.closeFunc = sinon.stub();
    this.Modal = TestUtils.renderIntoDocument(
      <Modal title="whatever" handleClose={this.closeFunc}>
        <div className="m-content">
          <p className="m-text">Just some noddy content</p>
          <a href="#" className="other-link">Click me</a>
        </div>
      </Modal>
    );
  });

  it('should have a title', function() {
    var title = helpers.findByTag(this.Modal, 'h2');
    assert.equal(title.getDOMNode().firstChild.nodeValue, 'whatever');
  });

  it('should have child content', function() {
    var content = helpers.findByClass(this.Modal, 'm-content');
    assert.equal(content.getDOMNode().nodeName.toLowerCase(), 'div');
  });

  it('should have child paragraph', function() {
    var text = helpers.findByClass(this.Modal, 'm-text');
    assert.equal(text.getDOMNode().firstChild.nodeValue,
                 'Just some noddy content');
  });

  it('clicking the modal background should call close func', function() {
    var modal = helpers.findByClass(this.Modal, 'modal');
    var event = {
      preventDefault: sinon.stub(),
      stopPropagation: sinon.stub(),
    };
    TestUtils.Simulate.click(modal.getDOMNode(), event);
    assert.ok(event.preventDefault.called);
    assert.ok(event.stopPropagation.called);
    assert.ok(this.closeFunc.called);
  });

  it('clicking the close link should call close func', function() {
    var close = helpers.findByClass(this.Modal, 'close');
    var event = {
      preventDefault: sinon.stub(),
      stopPropagation: sinon.stub(),
    };
    TestUtils.Simulate.click(close.getDOMNode(), event);
    assert.ok(event.preventDefault.called);
    assert.ok(event.stopPropagation.called);
    assert.ok(this.closeFunc.called);
  });

  it('clicking the content link should not call close func', function() {
    var otherLink = helpers.findByClass(this.Modal, 'other-link');
    var event = {
      preventDefault: sinon.stub(),
      stopPropagation: sinon.stub(),
    };
    TestUtils.Simulate.click(otherLink.getDOMNode(), event);
    assert.notOk(event.preventDefault.called);
    assert.notOk(event.stopPropagation.called);
    assert.notOk(this.closeFunc.called);
  });

});
