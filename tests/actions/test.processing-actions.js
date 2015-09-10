import * as actionTypes from 'constants/action-types';
import { beginProcessing, stopProcessing } from 'actions/processing';


describe('Processing Actions', function() {

  it('should dispatch a begin processing action', function() {
    assert.deepEqual(beginProcessing('proc-id'), {
      type: actionTypes.BEGIN_PROCESSING,
      processingId: 'proc-id',
    });
  });

  it('should dispatch a stop processing action', function() {
    assert.deepEqual(stopProcessing('proc-id'), {
      type: actionTypes.STOP_PROCESSING,
      processingId: 'proc-id',
    });
  });

  it('should throw an error for empty processing IDs', function() {
    assert.throws(() => beginProcessing(null), Error,
                  /processingId cannot be empty/);
  });

});
