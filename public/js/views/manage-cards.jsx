'use strict';

var React = require('react');

var Modal = require('components/modal');
var CardList = require('components/card-list');

var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'ManageCards',

  propTypes: {
    closeModal: React.PropTypes.func.isRequired,
    paymentMethods: React.PropTypes.array.isRequired,
  },

  render: function() {
    return (
      <Modal
        handleClose={this.props.closeModal}
        title={gettext('Payment Methods')}>
        <CardList cards={this.props.paymentMethods} />
      </Modal>
    );
  },

});

