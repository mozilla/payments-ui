import * as api from 'actions/api';


describe('api', () => {
  describe('fetch', () => {

    var fakeSettings;
    var fakeJquery;

    beforeEach(() => {
      fakeSettings = {apiPrefix: 'http://not-a-real-api.com/api'};
      fakeJquery = {ajax: sinon.stub()};
    });

    function fetch(request={url: '/any/path/'}, opt=null) {
      if (!opt) {
        opt = {
          settings: fakeSettings,
          jquery: fakeJquery,
          csrfToken: false,
        };
      }
      return api.fetch(request, opt);
    }

    it('prefixes URLs with the API host', () => {
      var request = {url: '/some/service'};
      fetch(request);

      assert.equal(fakeJquery.ajax.firstCall.args[0].url,
                   fakeSettings.apiPrefix + request.url);
    });

    it('does not send credentials when CORS is not allowed', () => {
      fakeSettings.allowCORSRequests = false;
      fetch();
      assert.equal(fakeJquery.ajax.firstCall.args[0].xhrFields.withCredentials,
                   undefined);
    });

    it('sends credentials when CORS is allowed', () => {
      fakeSettings.allowCORSRequests = true;
      fetch();
      assert.equal(fakeJquery.ajax.firstCall.args[0].xhrFields.withCredentials,
                   true);
    });

    it('requires a CSRF token', () => {
      assert.throws(
        () => fetch({url: '/some/service'}, {csrfToken: undefined}),
        /You must set a CSRF token/
      );
    });

  });
});
