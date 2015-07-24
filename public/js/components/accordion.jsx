/*eslint react/no-multi-comp: 0 */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';


class Accordion extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    var sections = [];
    React.Children.forEach(this.props.children, function() {
      sections.push({isActive: false});
    });
    sections[0].isActive = true;
    this.state = {
      sections: sections,
    };
  }

  activate(sectionIdx, e) {
    if (e.target.getAttribute('data-activate') !== null) {
      e.preventDefault();
      var sections = this.state.sections;
      sections.forEach(function(section, idx) {
        section.isActive = (sectionIdx === idx);
      });
      this.setState({sections: sections});
    }
  }

  render() {
    var children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        activate: this.activate.bind(this, idx),
        isActive: this.state.sections[idx].isActive,
      });
    });
    return (
      <div className="accordion" ref="accordion">
        {children}
      </div>
    );
  }
}


class AccordionSection extends Component {

  static propTypes = {
    activate: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    isActive: React.PropTypes.bool,
  };

  render() {
    var classes = cx(
      'ac-section', {'active': this.props.isActive});

    return (
      <section onClick={this.props.activate}
        className={classes}>
        {this.props.children}
      </section>
    );
  }
}


class AccordionContent extends Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="ac-content">
        {this.props.children}
      </div>
    );
  }
}


export default {
  Accordion,
  AccordionContent,
  AccordionSection,
};
