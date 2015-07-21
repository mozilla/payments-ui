'use strict';

var React = require('react');
var gettext = require('utils').gettext;
var cx = require('classnames');


module.exports = React.createClass({

  displayName: 'Modal',

  propTypes: {
    children: React.PropTypes.array.required,
    close: React.PropTypes.func,
    showModal: React.PropTypes.bool,
    title: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      showModal: true,
    };
  },

  render: function() {

    var classes = cx(['modal', {'active': this.props.showModal}]);

    return (
      <div className={classes} onClick={this.props.close}>
        <div className="inner">
          <header>
            {this.props.title ? <h2>{this.props.title}</h2> : null}
            <a href="#" onClick={this.props.close} className="close">
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

