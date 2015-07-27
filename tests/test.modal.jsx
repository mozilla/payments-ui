import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Modal from 'components/modal';

import * as helpers from './helpers';


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
    this.eventStub = {
      preventDefault: sinon.stub(),
      stopPropagation: sinon.stub(),
    };
  });

  it('should have a title', function() {
    var title = helpers.findByTag(this.Modal, 'h2');
    assert.equal(findDOMNode(title).firstChild.nodeValue, 'whatever');
  });

  it('should have child content', function() {
    var content = helpers.findByClass(this.Modal, 'm-content');
    assert.equal(findDOMNode(content).nodeName.toLowerCase(), 'div');
  });

  it('should have child paragraph', function() {
    var text = helpers.findByClass(this.Modal, 'm-text');
    assert.equal(findDOMNode(text).firstChild.nodeValue,
                 'Just some noddy content');
  });

  it('should call close func when clicking the modal background', function() {
    var modal = helpers.findByClass(this.Modal, 'modal');
    TestUtils.Simulate.click(modal, this.eventStub);
    assert.ok(this.eventStub.preventDefault.called);
    assert.ok(this.eventStub.stopPropagation.called);
    assert.ok(this.closeFunc.called);
  });

  it('should call close func when clicking the close link', function() {
    var close = helpers.findByClass(this.Modal, 'close');
    TestUtils.Simulate.click(findDOMNode(close), this.eventStub);
    assert.ok(this.eventStub.preventDefault.called);
    assert.ok(this.eventStub.stopPropagation.called);
    assert.ok(this.closeFunc.called);
  });

  it('should not call close func when clicking other content.', function() {
    var otherLink = helpers.findByClass(this.Modal, 'other-link');
    TestUtils.Simulate.click(findDOMNode(otherLink), this.eventStub);
    assert.notOk(this.eventStub.preventDefault.called);
    assert.notOk(this.eventStub.stopPropagation.called);
    assert.notOk(this.closeFunc.called);
  });

});
