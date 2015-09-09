import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import NotificationList from 'components/notification-list';

import * as helpers from '../helpers';


describe('NotificationList', function() {

  beforeEach(function() {
    this.removeNotification = sinon.stub();
    var MockCSSTransitionGroup = helpers.stubComponent('ul');
    var notifications = [
      ['foo', {
          type: 'error',
          text: 'error text',
          userDismissable: true,
          autoHide: false,
        },
      ], ['bar', {
          type: 'info',
          text: 'info text',
          userDismissable: false,
          autoHide: true,
        },
      ],
    ];
    this.NotificationList = TestUtils.renderIntoDocument(
      <NotificationList
        removeNotification={this.removeNotification}
        TransitionGroup={MockCSSTransitionGroup}
        notifications={notifications}
      />
    );
    console.log(React.findDOMNode(this.NotificationList));
  });

  it('should have two notifications', function() {
    var lis = helpers.findAllByTag(this.NotificationList, 'li');
    assert.equal(lis.length, 2);
  });

  it('should have an error notification', function() {
    assert.ok(helpers.findByClass(this.NotificationList, 'error'));
  });

  it('should have an info notification', function() {
    assert.ok(helpers.findByClass(this.NotificationList, 'info'));
  });

});

