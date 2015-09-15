import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';


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


/**
 * Schedules actions with { meta: { delay: N } } to be delayed
 * by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 * http://rackt.github.io/redux/docs/advanced/Middleware.html#seven-examples
 */
const timeoutScheduler = store => next => action => { // eslint-disable-line
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  console.log('Scheduling action with timeout', action);
  let timeoutId = setTimeout(
    () => {
      console.log('Running after timeout', action.meta.delay);
      next(action);
    },
    action.meta.delay
  );

  return function cancel() {
    clearTimeout(timeoutId);
  };
};


const createStoreWithMiddleware = applyMiddleware(
  timeoutScheduler,
  thunk,
  logger
)(createStore);


export function createReduxStore() {
  const store = createStoreWithMiddleware(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // See: https://github.com/rackt/react-redux/releases/tag/v2.0.0
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default createReduxStore();
