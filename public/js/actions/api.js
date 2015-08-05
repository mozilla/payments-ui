import $ from 'jquery';

import * as defaultSettings from 'settings';

var csrfToken;


export function fetch(request, {jquery=$, settings=defaultSettings} = {}) {
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

  if (csrfToken) {
    request.headers['X-CSRFToken'] = csrfToken;
  } else {
    console.warn('making request to ' + request.url +
                 ' but no CSRF token has been set');
  }

  return jquery.ajax(request);
}


export function setCSRFToken(token) {
  csrfToken = token;
}
