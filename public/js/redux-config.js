import { createRedux as createRedux_ } from 'redux';
import * as stores from 'stores';

function createRedux() {
  return createRedux_(stores);
}

export default createRedux();
export { createRedux as create };
