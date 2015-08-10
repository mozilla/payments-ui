import React, { Component, PropTypes } from 'react';
import JsonTable from 'react-json-table';

import { gettext, setTitle } from 'utils';
import * as products from 'products';
import Spinner from 'components/spinner';


export default class History extends Component {

  static propTypes = {
    getUserTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    setTitle(gettext('Receipts and history'));
    this.props.getUserTransactions();
  }

  showReceipt(e, transactionId) {
    e.preventDefault();
    // https://github.com/mozilla/payments-ui/issues/304
    console.log('TODO: show receipt for transaction', transactionId);
  }

  selectSeller(e) {
    e.preventDefault();
    // https://github.com/mozilla/payments-ui/issues/305
    console.log('TODO: filter transactions by seller', e.target);
  }

  renderContent() {

    var columns = [
      {
        key: 'created',
        label: gettext('Date'),
        cell: (item, columnKey) => (
            // TODO: parse and format date like:
            // "2015-08-07T14:53:23.966" : 'Aug 7, 2015'
            // https://github.com/mozilla/payments-ui/issues/306
            item[columnKey]
        ),
      },
      {
        key: 'seller',
        label: (
          <select onChange={this.selectSeller}>
            <option value="">
              {gettext('View transactions from all companies')}
            </option>
            <option value="example-seller">Example seller</option>
          </select>
        ),
        cell: (item) => (
          // TODO: get localized seller name, not just English.
          // https://github.com/mozilla/payments-ui/issues/307
          products.get(item.transaction.seller_product.public_id).seller.name.en
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
