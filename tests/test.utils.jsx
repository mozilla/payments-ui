import * as utils from 'utils';


describe('utils.parseQuery', function() {

  it('should parse a URL', function() {
    assert.deepEqual(utils.parseQuery('http://foo/?foo=foo&bar=bar'),
                     {foo: 'foo', bar: 'bar'});
  });

  it('should decode parameter values', function() {
    assert.deepEqual(utils.parseQuery('http://foo/?k=space%20separated'),
                     {k: 'space separated'});
  });

  it('should parse an empty query', function() {
    assert.deepEqual(utils.parseQuery('http://foo/'), {});
  });

  it('should not bother with repeated parameters', function() {
    assert.deepEqual(utils.parseQuery('http://foo/?foo=1&foo=2'), {foo: '2'});
  });

  it('should strip anchor hashes', function() {
    assert.deepEqual(utils.parseQuery('http://foo/?foo=foo#anchor'),
                     {foo: 'foo'});
  });

});


describe('utils.isDisabled', function() {

  it('should be disabled if disabled attr present', function() {
    var button = document.createElement('button');
    var disabledAttr = document.createAttribute('disabled');
    button.setAttributeNode(disabledAttr);
    assert.equal(utils.isDisabled(button), true);
  });

  it('should be disabled if disabled="1"', function() {
    var button = document.createElement('button');
    button.setAttribute('disabled', 1);
    assert.equal(utils.isDisabled(button), true);
  });

  it('should be disabled if disabled="true"', function() {
    var button = document.createElement('button');
    button.setAttribute('disabled', true);
    assert.equal(utils.isDisabled(button), true);
  });

  it('should still be disabled if disabled="false"', function() {
    var button = document.createElement('button');
    button.setAttribute('disabled', false);
    assert.equal(utils.isDisabled(button), true);
  });

  it('should be disabled if link has disabled className', function() {
    var lnk = document.createElement('a');
    lnk.className = 'disabled something';
    assert.equal(utils.isDisabled(lnk), true);
  });

  it('should not be disabled if link with disabled attr', function() {
    // Links don't have disabled attributes.
    var lnk = document.createElement('a');
    lnk.setAttribute('disabled', 'disabled');
    assert.equal(utils.isDisabled(lnk), false);
  });

  it('should not be disabled if non-link and disabled class', function() {
    var button = document.createElement('button');
    button.className = 'disabled something';
    assert.equal(utils.isDisabled(button), false);
  });

});


describe('utils.setTitle', function() {

    it('should set the title', function() {
        var dummy = {};
        utils.setTitle('Pay', dummy);
        assert.equal(dummy.title, 'Pay');
    });

});
