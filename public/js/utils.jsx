/**
* Populates an object with defaults if the key is not yet defined.
* Similar to _.defaults except this takes only a single defaults object.
* @param {object} object - the object to populate defaults on
* @param {object} opt - the defaults to use
* @returns {object}
*/

export function defaults(object, opt) {
  object = object || {};
  opt = opt || {};
  Object.keys(opt).forEach(function(key) {
    if (typeof object[key] === 'undefined') {
      object[key] = opt[key];
    }
  });
  return object;
}


export function isDisabled(domNode) {
  // Links dont' have disabled attrs so here we're checking
  // for a disabled classname instead.
  if (domNode.nodeName.toLowerCase() === 'a') {
    return domNode.className.split(' ').indexOf('disabled') > -1;
  }
  // The presence of the attribute 'disabled'
  // means it's disabled. Even disabled="false".
  return domNode.hasAttribute('disabled');
}


export function getMountNode(node){
  return node || document.getElementById('view');
}


export function gettext(string){
  // Initial no-op gettext stand-in.
  return string;
}


export function setTitle(string, doc=document) {
  doc.title = string;
}


export function parseQuery(url){
  //
  // Given a complete URL, parse the query string and return an
  // object of parameters->values. This doesn't bother with repeated
  // parameter names. You'll get the last one defined.
  //
  // @param {string} url - complete URL that may or may not include a query
  // @returns {object} - parsed query string parameter names mapped to values
  //
  var baseUrl = url.split('#')[0];
  var urlParts = baseUrl.split('?');
  var data = {};

  if (urlParts.length > 1) {
    urlParts[1].split('&').forEach((nameVal) => {
      var parts = nameVal.split('=');
      data[parts[0]] = decodeURIComponent(parts[1] || '');
    });
  }

  return data;
}
