import $ from 'jquery';

import * as defaultSettings from 'settings';


export function fetch(request,
                      {jquery=$, settings=defaultSettings, csrfToken} = {}) {
  request = Object.assign({
    dataType: 'json',
    headers: {},
    xhrFields: {},
  }, request);

  request.url = settings.apiPrefix + request.url;

  if (settings.allowCORSRequests) {
    // This will send cookies on Access Control requests which is needed
    // for sessions. It really only applies to newer XHR2 transports which
    // have  stricter security. We only need CORS for webpack hot
    // reloading development.
    request.xhrFields.withCredentials = true;
  }

  if (typeof csrfToken === 'undefined') {
    // This exists to stop someone from forgetting to pass in the stored CSRF
    // token.
    throw new Error(
      'You must set a CSRF token value; ' +
      'set it to false to fetch a resource without a token'
    );
  }

  if (csrfToken) {
    request.headers['X-CSRFToken'] = csrfToken;
  } else {
    console.warn('making request to ' + request.url +
                 ' but no CSRF token has been set');
  }

  return jquery.ajax(request);
}
