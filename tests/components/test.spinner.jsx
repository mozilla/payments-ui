import React, { findDOMNode } from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../helpers';

import Spinner from 'components/spinner';


describe('Spinner', function() {

  it('Uses loading as the default text', function() {
    var Spinner_ = TestUtils.renderIntoDocument(<Spinner />);
    var textNode = helpers.findByClass(Spinner_, 'text');
    assert.equal(findDOMNode(textNode).firstChild.nodeValue, 'Loading');
  });

  it('Uses custom text as supplied', function() {
    var Spinner_ = TestUtils.renderIntoDocument(<Spinner text="whatever" />);
    var textNode = helpers.findByClass(Spinner_, 'text');
    assert.equal(findDOMNode(textNode).firstChild.nodeValue, 'whatever');
  });

});
