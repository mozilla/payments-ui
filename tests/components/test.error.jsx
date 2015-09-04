import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../helpers';

import * as appActions from 'actions/app';
import ErrorMessage from 'components/error';


describe('ErrorMessage', function() {
  var fakeError;

  beforeEach(function() {
    fakeError = appActions.error('some error');
  });

  function mount({error=fakeError, ...props} = {}) {
    return TestUtils.renderIntoDocument(
      <ErrorMessage error={error} {...props} />
    );
  }

  it('should render a generic user message', function() {
    var error = mount();
    var msg = helpers.findByClass(error, 'msg');
    assert.equal(findDOMNode(msg).firstChild.nodeValue,
                 'Internal error. Please try again later.');
  });

  it('should render a custom user message', function() {
    var userMessage = 'Please turn on the light when you come in';
    var appState = appActions.error('debug message',
                                    {userMessage: userMessage});
    var error = mount({error: appState.error});

    var msg = helpers.findByClass(error, 'msg');
    assert.equal(findDOMNode(msg).firstChild.nodeValue, userMessage);
  });

});
