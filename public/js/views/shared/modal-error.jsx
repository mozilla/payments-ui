import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import ErrorMessage from 'components/error';


export default class ModalError extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Modal handleClose={this.props.closeModal}>
        <ErrorMessage error={this.props.error} />
      </Modal>
    );
  }

}

