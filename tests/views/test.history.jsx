import JsonTable from 'react-json-table';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Spinner from 'components/spinner';
import History from 'views/management/history';

import { transactionData } from '../actions/test.transaction';


describe('History', function() {
  var fakeTransactionGetter;

  beforeEach(function() {
    fakeTransactionGetter = sinon.stub();
  });

  function mountView({transactions=null} = {}) {
    return TestUtils.renderIntoDocument(
      <History
        getUserTransactions={fakeTransactionGetter}
        transactions={transactions}
      />
    );
  }

  it('should show a spinner when loading transactions', function() {
    var view = mountView({transactions: null});
    var spinner = TestUtils.findRenderedComponentWithType(
      view, Spinner
    );
    assert.ok(spinner);
  });

  it('should load transactions on mount', function() {
    mountView();
    assert.equal(fakeTransactionGetter.called, true);
  });

  it('should show transactions', function() {
    var data = transactionData();
    var view = mountView({transactions: data});
    var table = TestUtils.findRenderedComponentWithType(
      view, JsonTable
    );
    assert.equal(table.props.rows, data);
  });

  it('should format transaction dates', function() {
    var data = transactionData();
    var view = mountView({transactions: data});
    var table = TestUtils.findRenderedComponentWithType(
      view, JsonTable
    );

    var cell;
    // Use the JsonTable configuration to test formatting of date values.
    table.props.columns.forEach(config => {
      if (config.key === 'created') {
        // Simulate how JsonTable formats a row.
        cell = config.cell({created: '2015-08-07T14:53:23.966'}, 'created');
      }
    });

    assert.equal(cell, 'Aug 7, 2015');
  });

});
