import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import SubmitButton from 'components/submit-button';


describe('SubmitButton', function() {

  it('uses submit as the default text', function() {
    var Button = TestUtils.renderIntoDocument(<SubmitButton />);
    assert.equal(findDOMNode(Button).firstChild.nodeValue, 'Submit');
  });

  it('uses custom text as supplied', function() {
    var Button = TestUtils.renderIntoDocument(<SubmitButton text="whatever" />);
    assert.equal(findDOMNode(Button).firstChild.nodeValue, 'whatever');
  });

  it('gets a css modifier class', function() {
    var Button = TestUtils.renderIntoDocument(
      <SubmitButton cssModifier="some-modifier" />);
    assert.include(findDOMNode(Button).className, 'some-modifier');
  });

});
