import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardList from 'components/card-list';

import { gettext } from 'utils';


export default class PayMethods extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    showAddPayMethod: PropTypes.func.isRequired,
    showDelPayMethod: PropTypes.func.isRequired,
  };

  handleAddPayMethod = e => {
    e.preventDefault();
    this.props.showAddPayMethod();
  }

  handleDelPayMethod = e => {
    e.preventDefault();
    this.props.showDelPayMethod();
  }

  renderChild() {
    if (this.props.payMethods && this.props.payMethods.length) {
      return (
        <CardList cards={this.props.payMethods} />
      );
    }
    return (<p className="no-results">
      {gettext("You haven't added any credit cards yet")}
    </p>);
  }

  render() {
    return (
      <Modal
        handleClose={this.props.closeModal}
        title={gettext('Payment Methods')}>
        <div>
          {this.renderChild()}
          <a className="add-pay-method" href="#"
            onClick={this.handleAddPayMethod}>{gettext('Add a new card')}</a>
          <a className="delete-pay-method" href="#"
            onClick={this.handleDelPayMethod}>{gettext('Delete')}</a>
        </div>
      </Modal>
    );
  }

}
