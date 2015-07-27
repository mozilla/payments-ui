import { createStore } from 'redux';
import * as reducers from 'reducers';

export function createReduxStore() {
  return createStore(reducers);
}

export default createReduxStore();
