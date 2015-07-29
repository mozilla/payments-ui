import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardList from 'components/card-list';

import { gettext } from 'utils';


export default class PayMethods extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    paymentMethods: PropTypes.array.isRequired,
  };

  renderChild() {
    if (this.props.paymentMethods && this.props.paymentMethods.length) {
      return <CardList cards={this.props.paymentMethods} />;
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
        </div>
      </Modal>
    );
  }

}
