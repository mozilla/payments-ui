import { createRedux } from 'redux';
import * as stores from 'stores';

export function create() {
  return createRedux(stores);
}

export default create();
