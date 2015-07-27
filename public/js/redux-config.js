import { createStore, combineReducers } from 'redux';
import * as reducers from 'reducers';

export function createReduxStore() {
  return createStore(combineReducers(reducers));
}

export default createReduxStore();
