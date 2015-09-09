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

  it('should preserve URL path hashes', function() {
    assert.deepEqual(utils.parseQuery('http://foo/#/?foo=foo'),
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


describe('utils.configGetText', function() {

  it('should fallback', function() {
    assert.equal(
      utils.configGetText({'en': 'hello'}, {'languages': ['fr']}),
      'hello'
    );
  });

  it('should go through choice', function() {
    assert.equal(
      utils.configGetText(
        {'fr': 'bonjour', 'es': 'hola'},
        {'languages': ['de', 'fr', 'es']}),
      'bonjour'
    );
  });

  it('should cope with missing navigator.languages', function() {
    assert.equal(
      utils.configGetText({'fr': 'bonjour'}, {'language': 'fr'}),
      'bonjour'
    );
  });

});


describe('utils.isValidEmail', function() {

  it('should be invalid as incomplete', function() {
    assert.notOk(utils.isValidEmail('foo@'));
  });

  it('should be valid', function() {
    assert.ok(utils.isValidEmail('foo@bar'));
  });

  it('should be invalid as ending in period', function() {
    assert.notOk(utils.isValidEmail('foo@bar.'));
  });

});

describe('utils.validateEmailAsYouType', function() {

  it('should be potentially valid but not valid', function() {
    var emailData = utils.validateEmailAsYouType('foo@');
    assert.ok(emailData.isPotentiallyValid);
    assert.notOk(emailData.isValid);
  });

  it('should be fully valid', function() {
    var emailData = utils.validateEmailAsYouType('foo@bar.com');
    assert.ok(emailData.isPotentiallyValid);
    assert.ok(emailData.isValid);
  });

  it('should be invalid ending in a period', function() {
    var emailData = utils.validateEmailAsYouType('foo@bar.');
    assert.notOk(emailData.isPotentiallyValid);
    assert.notOk(emailData.isValid);
  });

  it('should be invalid as too many @', function() {
    var emailData = utils.validateEmailAsYouType('foo@@');
    assert.notOk(emailData.isPotentiallyValid);
    assert.notOk(emailData.isValid);
  });

});

describe('utils.arrayHasSubString', function() {

  var list = [
    'foo bar baz',
    'test',
  ];

  it('should be true as string is present', function() {
    assert.ok(utils.arrayHasSubString(list, 'test'));
  });

  it('should be true as substring is present', function() {
    assert.ok(utils.arrayHasSubString(list, 'bar'));
  });

  it('should be false as substring is not present', function() {
    assert.notOk(utils.arrayHasSubString(list, 'banana'));
  });

});


describe('utils.getId', function() {

  it('should produce a unique id', function() {
    assert.notEqual(utils.getId(), utils.getId());
  });

});
