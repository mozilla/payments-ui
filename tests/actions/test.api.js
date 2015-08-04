import * as api from 'actions/api';


describe('api', () => {
  describe('fetch', () => {

    it('prefixes URLs with the API host', () => {
      var opt = {
        settings: {apiPrefix: 'http://not-a-real-api.com/api'},
        jquery: {ajax: sinon.stub()},
      };
      var request = {
        url: '/some/service',
      };

      api.fetch(request, opt);

      assert.equal(opt.jquery.ajax.firstCall.args[0].url,
                   opt.settings.apiPrefix + request.url);
    });

  });
});
