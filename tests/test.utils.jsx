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

});


describe('utils.isDisabled', function() {

  it('should be disabled if disabled attr present', function() {
    var lnk = document.createElement('a');
    var disabledAttr = document.createAttribute('disabled');
    lnk.setAttributeNode(disabledAttr);
    assert.equal(utils.isDisabled(lnk), true);
  });

  it('should be disabled if disabled="1"', function() {
    var lnk = document.createElement('a');
    lnk.setAttribute('disabled', 1);
    assert.equal(utils.isDisabled(lnk), true);
  });

  it('should be disabled if disabled="true"', function() {
    var lnk = document.createElement('a');
    lnk.setAttribute('disabled', true);
    assert.equal(utils.isDisabled(lnk), true);
  });

  it('should still be disabled if disabled="false"', function() {
    var lnk = document.createElement('a');
    lnk.setAttribute('disabled', false);
    assert.equal(utils.isDisabled(lnk), true);
  });

  it('should be disabled if has disabled className', function() {
    var lnk = document.createElement('a');
    lnk.className = 'disabled something';
    assert.equal(utils.isDisabled(lnk), true);
  });

});
