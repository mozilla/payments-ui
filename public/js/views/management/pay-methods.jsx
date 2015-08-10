import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import CardDropdown from 'components/card-drop-down';

import { gettext, isDisabled, setTitle } from 'utils';


export default class PayMethods extends Component {

  static propTypes = {
    payMethods: PropTypes.array.isRequired,
    showAddPayMethod: PropTypes.func.isRequired,
    showDelPayMethod: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTitle(gettext('Payment methods'));
  }

  handleAddPayMethod = e => {
    e.preventDefault();
    this.props.showAddPayMethod();
  }

  handleDelPayMethod = e => {
    e.preventDefault();
    if (isDisabled(e.target)) {
      console.log('Delete link is disabled. no-op');
      return;
    }
    this.props.showDelPayMethod();
  }

  renderChild() {
    if (this.props.payMethods && this.props.payMethods.length) {
      return (
        <CardDropdown cards={this.props.payMethods} />
      );
    }
    return (<p className="no-results">
      {gettext("You haven't added any credit cards yet")}
    </p>);
  }

  render() {

    var isDeleteDisabled = !this.props.payMethods ||
      !this.props.payMethods.length;
    var deleteClasses = cx('button', 'quiet', 'delete',
                           {'disabled': isDeleteDisabled});

    return (
      <div>
        <h1>{gettext('Payment Methods')}</h1>
        <div className="small-form">
          {this.renderChild()}
          <a className="button quiet add-pay-method" href="#"
            onClick={this.handleAddPayMethod}>{gettext('Add a new card')}</a>
          <a className={deleteClasses} href="#"
            onClick={this.handleDelPayMethod}>{gettext('Delete')}</a>
        </div>
      </div>
    );
  }

}
