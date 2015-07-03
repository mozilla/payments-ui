'use strict';

var React = require('react');

var utils = require('utils');

var gettext = utils.gettext;


module.exports = React.createClass({
  displayName: 'Error',

  propTypes: {
    error: React.PropTypes.object.isRequired,
  },

  render: function() {
    console.log('rendering app error:', this.props.error);
    return (
      <div className="app-error">
        {gettext('Internal error. Please try again later.')}
      </div>
    );
  },

});
