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
  Object.keys(defaults).forEach(function(key) {
    if (typeof object[key] === 'undefined') {
      object[key] = defaults[key];
    }
  });
  return object;
};


exports.getMountNode = function() {
  return document.getElementById('view');
};
