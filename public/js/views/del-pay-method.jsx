import React, { Component, PropTypes } from 'react';

import Modal from 'components/modal';
import CardChoice from 'components/card-choice';

import { default as tracking } from 'tracking';
import { gettext } from 'utils';


export default class DelPayMethod extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    delPayMethod: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
  }

  componentDidMount() {
    tracking.setPage('/del-pay-method');
  }

  handleSubmit = (card) => {
    this.props.delPayMethod(card);
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
