import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'reducers';

function logger({ getState }) {
  return next => action => {
    if (typeof action.type === 'undefined') {
      console.error('action.type is undefined.',
        'Check that the action is defined in constants/action-types.js');
    }
    console.info('redux: dispatching', action);
    const result = next(action);
    console.log('redux: state after', getState());
    return result;
  };
}

export function createReduxStore() {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(thunk, logger)(createStore);
  return finalCreateStore(reducer);
}

export default createReduxStore();
