import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { Accordion,
         AccordionContent,
         AccordionSection } from 'components/accordion';

import * as helpers from './helpers';


describe('Accordion', function() {

  beforeEach(function() {
    this.Accordion = TestUtils.renderIntoDocument(
      <Accordion>
        <AccordionSection>
          <h2>Section 1</h2>
          <button className="button1" data-activate>Click this</button>
          <AccordionContent>
            <p>Section 1 content</p>
          </AccordionContent>
        </AccordionSection>

        <AccordionSection>
          <h2>Section 2</h2>
          <button className="button2" data-activate>Click this</button>
          <AccordionContent>
            <p>Section 2 content</p>
          </AccordionContent>
        </AccordionSection>

        <AccordionSection>
          <h2>Section 3</h2>
          <button className="button3">Click this</button>
          <p>Section 3 content</p>
        </AccordionSection>
      </Accordion>
    );
  });

  it('should initialize with first section visible', function() {
    var sections = helpers.findAllByClass(this.Accordion, 'ac-section');
    assert.include(sections[0].getDOMNode().getAttribute('class'), 'active');
    assert.notInclude(sections[1].getDOMNode().getAttribute('class'), 'active');
    assert.notInclude(sections[2].getDOMNode().getAttribute('class'), 'active');
  });

  it('should show section 2 on click', function() {
    var button2 = helpers.findByClass(this.Accordion, 'button2');
    TestUtils.Simulate.click(button2.getDOMNode());
    var sections = helpers.findAllByClass(this.Accordion, 'ac-section');
    assert.notInclude(sections[0].getDOMNode().getAttribute('class'), 'active');
    assert.include(sections[1].getDOMNode().getAttribute('class'), 'active');
    assert.notInclude(sections[2].getDOMNode().getAttribute('class'), 'active');
  });

  it('clicking button in section3 should be a noop', function() {
    var button3 = helpers.findByClass(this.Accordion, 'button3');
    TestUtils.Simulate.click(button3.getDOMNode());
    var sections = helpers.findAllByClass(this.Accordion, 'ac-section');
    assert.include(sections[0].getDOMNode().getAttribute('class'), 'active');
    assert.notInclude(sections[1].getDOMNode().getAttribute('class'), 'active');
    assert.notInclude(sections[2].getDOMNode().getAttribute('class'), 'active');
  });

});
