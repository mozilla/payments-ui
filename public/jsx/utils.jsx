'use strict';

/**
* Populates an object with defaults if the key is not yet defined.
* Similar to _.defaults except this takes only a single defaults object.
* @param {object} object - the object to populate defaults on
* @param {object} defaults - the defaults to use
* @returns {object}
*/

exports.defaults = (object, defaults) => {
  object = object || {};
  defaults = defaults || {};
  Object.keys(defaults).forEach(function(key) {
    if (typeof object[key] === 'undefined') {
      object[key] = defaults[key];
    }
  });
  return object;
};


exports.getMountNode = (node) => {
  return node || document.getElementById('view');
};


exports.gettext = (string) => {
  // Initial no-op gettext stand-in.
  return string;
};


exports.parseQuery = (url) => {
  //
  // Given a complete URL, parse the query string and return an
  // object of parameters->values. This doesn't bother with repeated
  // parameter names. You'll get the last one defined.
  //
  // @param {string} url - complete URL that may or may not include a query
  // @returns {object} - parsed query string parameter names mapped to values
  //
  var urlParts = url.split('?');
  var data = {};

  if (urlParts.length > 1) {
    urlParts[1].split('&').forEach((nameVal) => {
      var parts = nameVal.split('=');
      data[parts[0]] = decodeURIComponent(parts[1] || '');
    });
  }

  return data;
};
