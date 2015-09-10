import * as actionTypes from 'constants/action-types';
import processingReducer from 'reducers/processing';
import { initialProcessingState } from 'reducers/processing';


describe('Processing Reducer', function() {

  it('should initialize state', function() {
    assert.deepEqual(processingReducer(undefined, {}),
                     initialProcessingState);
  });

  it('should store true when a component begins processing', function() {
    var procId = 'some-id';
    var state = processingReducer(initialProcessingState, {
      type: actionTypes.BEGIN_PROCESSING,
      processingId: procId,
    });
    assert.equal(state[procId], true);
  });

  it('should clear state when a component stops processing', function() {
    var procId = 'some-id';
    var state = processingReducer(initialProcessingState, {
      type: actionTypes.BEGIN_PROCESSING,
      processingId: procId,
    });
    state = processingReducer(state, {
      type: actionTypes.STOP_PROCESSING,
      processingId: procId,
    });
    // This should now be deleted.
    assert.equal(state[procId], undefined);
  });

});
