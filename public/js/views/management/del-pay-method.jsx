import React, { Component, PropTypes } from 'react';

import CardChoice from 'components/pay-method-choice';

import { default as tracking } from 'tracking';
import { gettext, setTitle } from 'utils';


export default class DelPayMethod extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    delPayMethod: PropTypes.func.isRequired,
    payMethods: PropTypes.array.isRequired,
    showPayMethods: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setTitle(gettext('Delete Payment Method'));
    tracking.setPage('/del-pay-method');
  }

  handleSubmit = (card) => {
    this.props.delPayMethod(card);
  }

  render() {
    return (
      <div>
        <h1>{gettext('Delete Payment Method')}</h1>
        <div className="small-form">
          <CardChoice
            cssModifier='delete'
            submitButtonText={gettext('Delete')}
            submitButtonCSSModifier='warning'
            submitHandler={this.handleSubmit}
            payMethods={this.props.payMethods}
          />
        </div>
        <a href="#" className="back" onClick={this.props.showPayMethods}>
          {gettext('Back')}</a>
      </div>
    );
  }
}
