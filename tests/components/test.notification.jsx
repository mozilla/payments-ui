import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Notification from 'components/notification';
import { getId } from 'utils';

import * as helpers from '../helpers';


describe('Notification', function() {

  beforeEach(function() {
    this.removeNotification = sinon.stub();
    this.getNotification = ({ autoHide=false, userDismissable=false,
                              type='info', text='hai' } = {}) => {
      return TestUtils.renderIntoDocument(
        <Notification
          text={text}
          type={type}
          key={getId()}
          autoHide={autoHide}
          userDismissable={userDismissable}
          removeNotification={this.removeNotification}
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

  it('should call removeNotification with delay', function() {
    var notification = this.getNotification({autoHide: true});
    assert.equal(this.removeNotification.firstCall.args[0],
                 notification.props.key);
    assert.equal(this.removeNotification.firstCall.args[1].delay, 5000);
  });

  it('should call removeNotificationClick on click', function() {
    var notification = this.getNotification({userDismissable: true});
    var link = helpers.findByTag(notification, 'a').getDOMNode();
    var prevDefault = sinon.stub();
    TestUtils.Simulate.click(link, {preventDefault: prevDefault});
    assert.ok(this.removeNotification.called);
    assert.ok(prevDefault.called);
  });
});
