import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';
import cx from 'classnames';


export default class Modal extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  onClose = (e) => {
    var targetClassName = e.target.getAttribute('class') || '';
    var classes = targetClassName.split(' ');
    // Only deal with closing the window if the event
    // came from the backdrop or the close link.
    if (classes.length > 0 &&
        (classes.indexOf('modal') > -1 ||
         classes.indexOf('close') > -1)) {
      e.preventDefault();
      e.stopPropagation();
      this.props.handleClose();
    }
  }

  render() {
    var classes = cx(['modal', {'active': true}]);

    return (
      <div className={classes} onClick={this.onClose}>
        <div className="inner">
          <header>
            {this.props.title ? <h2>{this.props.title}</h2> : null}
            <a href="#" onClick={this.onClose} className="close">
              <span className="vh">{gettext('Close')}</span>
            </a>
          </header>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
