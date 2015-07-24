import ghPagesConfig from '../tasks/gh-pages';

describe('grunt-gh-pages config', function() {
  it('Docker builds should be silent=true', function() {
    assert.equal(ghPagesConfig.docker.options.silent, true);
  });
});
