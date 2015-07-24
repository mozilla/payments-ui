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
