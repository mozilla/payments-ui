import React from 'react';
import { Provider } from 'react-redux';

import { default as ManagementApp } from './app';
import dataStore from 'data-store';


React.render((
  <Provider store={dataStore}>
    {() => <ManagementApp/>}
  </Provider>
), document.getElementById('placeholder'));
