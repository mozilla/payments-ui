'use strict';

/*eslint react/no-multi-comp: 0 */

var React = require('react');
var cx = require('classnames');


var Accordion = React.createClass({

  displayName: 'Accordion',

  propTypes: {
    children: React.PropTypes.array,
  },

  getInitialState: function() {
    var sections = [];
    React.Children.forEach(this.props.children, function() {
      sections.push({isActive: false});
    });
    sections[0].isActive = true;
    return {
      sections: sections,
    };
  },

  activate: function(sectionIdx, e) {
    if (e.target.getAttribute('data-activate') !== null) {
      e.preventDefault();
      var sections = this.state.sections;
      sections.forEach(function(section, idx) {
        section.isActive = (sectionIdx === idx);
      });
      this.setState({sections: sections});
    }
  },

  render: function() {
    var that = this;
    var children = React.Children.map(this.props.children, function(child, idx){
      return React.cloneElement(child, {
        activate: that.activate.bind(that, idx),
        isActive: that.state.sections[idx].isActive,
      });
    });
    return (
      <div className="accordion" ref="accordion">
        {children}
      </div>
    );
  },
});

var AccordionSection = React.createClass({

  displayName: 'AccordionSection',

  propTypes: {
    activate: React.PropTypes.function,
    children: React.PropTypes.array,
    isActive: React.PropTypes.bool,
  },

  render: function() {

    var classes = cx(
      'ac-section', {'active': this.props.isActive});

    return (
      <section onClick={this.props.activate}
        className={classes}>
        {this.props.children}
      </section>
    );
  },
});


var AccordionContent = React.createClass({

  displayName: 'AccordionContent',

  propTypes: {
    children: React.PropTypes.array,
  },

  render: function() {
    return (
      <div className="ac-content">
        {this.props.children}
      </div>
    );
  },
});

module.exports = {
  Accordion: Accordion,
  AccordionContent: AccordionContent,
  AccordionSection: AccordionSection,
};
