'use strict';

/**
* Populates an object with defaults if the key is not yet defined.
* Similar to _.defaults except this takes only a single defaults object.
* @param {object} object - the object to populate defaults on
* @param {object} defaults - the defaults to use
* @returns {object}
*/

exports.defaults = function(object, defaults) {
  object = object || {};
  defaults = defaults || {};
  Object.keys(defaults).forEach(function(key) {
    if (typeof object[key] === 'undefined') {
      object[key] = defaults[key];
    }
  });
  return object;
};


exports.getMountNode = function(node) {
  return node || document.getElementById('view');
};


exports.gettext = function(string) {
  // Initial no-op gettext stand-in.
  return string;
};
