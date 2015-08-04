import $ from 'jquery';

import * as defaultSettings from 'settings';

var csrfToken;


export function fetch(request, {jquery=$, settings=defaultSettings} = {}) {
  request = Object.assign({
    dataType: 'json',
    headers: {},
    xhrFields: {withCredentials: true},
  }, request);

  request.url = settings.apiPrefix + request.url;

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
