'use strict';

var React = require('react');

var utils = require('utils');

var gettext = utils.gettext;


module.exports = React.createClass({
  displayName: 'Error',

  render: function() {
    return (
      <div class="app-error">
        {gettext('Internal error. Please try again later.')}
      </div>
    );
  },

});
