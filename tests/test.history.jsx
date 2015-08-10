import JsonTable from 'react-json-table';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Spinner from 'components/spinner';
import History from 'views/management/history';

import { transactionData } from './actions/test.transaction';


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

});
