import React from 'react';
import { Provider } from 'react-redux';

import tracking from 'tracking';

import { default as TransactionApp } from './app';
import dataStore from 'data-store';


tracking.init();

React.render((
  <Provider store={dataStore}>
    {function() {
      return <TransactionApp/>;
    }}
  </Provider>
), document.body);
