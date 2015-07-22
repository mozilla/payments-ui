'use strict';

var React = require('react');
var gettext = require('utils').gettext;
var cx = require('classnames');


module.exports = React.createClass({

  displayName: 'Modal',

  propTypes: {
    children: React.PropTypes.object.isRequired,
    handleClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
  },

  onClose: function(e) {
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
  },

  render: function() {
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
  },
});
