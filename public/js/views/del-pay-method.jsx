import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardChoice from 'components/card-choice';

import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class DelPayMethod extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    delCreditCard: PropTypes.func.isRequired,
    payMethods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
      })
    ).isRequired,
  }

  componentDidMount() {
    tracking.setPage('/del-pay-method');
  }

  handleSubmit = (card) => {
    this.props.delCreditCard(card);
  }

  render() {
    return (
      <Modal handleClose={this.props.closeModal}
        title={gettext('Delete Card')}>
        <div>
          <CardChoice
            cssModifier='delete'
            submitButtonText={gettext('Delete')}
            submitButtonCSSModifier='warning'
            submitHandler={this.handleSubmit}
            cards={this.props.payMethods}
          />
        </div>
      </Modal>
    );
  }
}
