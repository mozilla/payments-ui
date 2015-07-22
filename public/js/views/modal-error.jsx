'use strict';

var React = require('react');
var Modal = require('components/modal');

var ErrorMessage = require('components/error');

module.exports = React.createClass({

  displayName: 'ModalError',

  propTypes: {
    closeModal: React.PropTypes.func.isRequired,
    error: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <Modal handleClose={this.props.closeModal}>
        <ErrorMessage error={this.props.error} />
      </Modal>
    );
  },

});

