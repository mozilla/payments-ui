'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var helpers = require('./helpers');

var Spinner = require('components/spinner');


describe('Spinner', function() {

  it('Uses loading as the default text', function() {
    var Spinner_ = TestUtils.renderIntoDocument(<Spinner />);
    var textNode = helpers.findByClass(Spinner_, 'text');
    assert.equal(textNode.getDOMNode().firstChild.nodeValue, 'Loading');
  });

  it('Uses custom text as supplied', function() {
    var Spinner_ = TestUtils.renderIntoDocument(<Spinner text="whatever" />);
    var textNode = helpers.findByClass(Spinner_, 'text');
    assert.equal(textNode.getDOMNode().firstChild.nodeValue, 'whatever');
  });

});
