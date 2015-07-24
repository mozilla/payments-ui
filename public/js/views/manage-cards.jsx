import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardList from 'components/card-list';

import { gettext } from 'utils';


export default class ManageCards extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    paymentMethods: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Modal
        handleClose={this.props.closeModal}
        title={gettext('Payment Methods')}>
        <CardList cards={this.props.paymentMethods} />
      </Modal>
    );
  }

}
