import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Notification from 'components/notification';

import * as helpers from '../helpers';


describe('Notification', function() {

  beforeEach(function() {
    this.handleDismissClick = sinon.stub();
    this.handleAutoHide = sinon.stub();
    this.getNotification = ({ autoHide=false, userDismissable=false,
                              type='info', text='hai' } = {}) => {
      return TestUtils.renderIntoDocument(
        <Notification
          text={text}
          type={type}
          autoHide={autoHide}
          userDismissable={userDismissable}
          handleDismissClick={this.handleDismissClick}
          handleAutoHide={this.handleAutoHide}
        />
      );
    };
  });

  it('should have text', function() {
    var notification = this.getNotification({text: 'whatever'});
    assert.equal(
      helpers.findByClass(notification, 'text')
        .getDOMNode().textContent, 'whatever');
  });

  it('should have error class for type: error', function() {
    var notification = this.getNotification({type: 'error'});
    assert.ok(helpers.findByClass(notification, 'error'));
  });

  it('should have info class for type: info', function() {
    var notification = this.getNotification({type: 'info'});
    assert.ok(helpers.findByClass(notification, 'info'));
  });

  it('should have a dismiss link when userDismissable is true', function() {
    var notification = this.getNotification({userDismissable: true});
    assert.equal(
      helpers.findByTag(notification, 'a')
        .getDOMNode().getAttribute('class'), 'dismiss');
  });

  it('should call handleAutoHide with delay', function() {
    this.getNotification({autoHide: true});
    assert.equal(this.handleAutoHide.firstCall.args[0].delay, 5000);
  });

  it('should call handleDismissClick on click', function() {
    var notification = this.getNotification({userDismissable: true});
    var link = helpers.findByTag(notification, 'a').getDOMNode();
    TestUtils.Simulate.click(link);
    assert.ok(this.handleDismissClick.called);
  });
});
