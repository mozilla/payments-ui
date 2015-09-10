import React, { Component, PropTypes } from 'react';
import JsonTable from 'react-json-table';
import fecha from 'fecha';

import { configGetText, gettext, setTitle } from 'utils';
import * as products from 'products';
import Spinner from 'components/spinner';


export default class History extends Component {

  static propTypes = {
    getUserTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    setTitle(gettext('Transaction Receipts & History'));
    this.props.getUserTransactions();
  }

  showReceipt(e, transactionId) {
    e.preventDefault();
    // https://github.com/mozilla/payments-ui/issues/304
    console.log('TODO: show receipt for transaction', transactionId);
  }

  renderContent() {

    var columns = [
      {
        key: 'created',
        label: gettext('Date'),
        cell: (item, columnKey) => (
          fecha.format(fecha.parse(item[columnKey], 'YYYY-MM-DDThh:mm:ss.SSS'),
                       'MMM D, YYYY')
        ),
      },
      {
        key: 'seller',
        label: gettext('Vendor & Product'),
        cell: (item) => (
          configGetText(
            products.get(
              item.transaction.seller_product.public_id
            ).seller.name)
        ),
      },
      {
        key: 'amount',
        label: gettext('Amount'),
        cell: (item) => (
          // TODO: display currency with symbol (when possible)
          // https://github.com/mozilla/payments-ui/issues/308
          <a onClick={(e) => this.showReceipt(e, item.resource_pk)}
             href="#">{item.transaction.currency} {item.transaction.amount}</a>
        ),
      },
    ];

    // TODO: this is currently showing all transactions but that might be
    // weird when it includes kinds other than subscription_charged_successfully

    if (this.props.transactions === null) {
      return <Spinner/>;
    } else {
      if (this.props.transactions.length) {
        return <JsonTable rows={this.props.transactions} columns={columns} />;
      } else {
        return <p>{gettext("You haven't purchased anything yet.")}</p>;
      }
    }
  }

  render() {
    return (
      <div>
        <h1>{gettext('Transaction Receipts & History')}</h1>
        {this.renderContent()}
      </div>
    );
  }
}
