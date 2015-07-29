import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardDetails from 'views/card-details';


export default class AddPayMethod extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal handleClose={this.props.closeModal}>
        <CardDetails />
      </Modal>
    );
  }

}

