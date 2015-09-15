import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as management } from './management';
import { default as processing } from './processing';
import { default as transaction } from './transaction';
import { default as user } from './user';


const rootReducer = combineReducers({
  app,
  management,
  processing,
  transaction,
  user,
});

export default rootReducer;
