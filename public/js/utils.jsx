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

/**
* Similar to getText, but works on a product JSON object returned by
* the payments configuration so we can figure out the best data to show.
*
* This loops through each language in navigator.languages until it finds
* a match, if not it falls back to en.
*
* @param {object} config - the value from payment-config
*/

export function configGetText(config, nav=navigator) {
  var result = null;
  var languages = nav.languages || new Array(nav.language || nav.userLanguage);
  languages.some(value => result = config[value]);
  return result || config.en;
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


/*
 * Given a complete URL, parse the query string and return an
 * object of parameters->values. This doesn't bother with repeated
 * parameter names. You'll get the last one defined.
 * @param {string} url - complete URL that may or may not include a query
 * @returns {object} - parsed query string parameter names mapped to values
 */
export function parseQuery(url){
  var urlParts = url.split('?');
  var data = {};

  if (urlParts.length > 1) {
    var query = urlParts[1];
    // Get rid of any anchor that might be on the end of the query:
    query = query.split('#')[0];
    query.split('&').forEach((nameVal) => {
      var parts = nameVal.split('=');
      data[parts[0]] = decodeURIComponent(parts[1] || '');
    });
  }

  return data;
}


/**
 * Given a list of pay-method objects return one that matches
 * the payMethodUri. If no matches, it returns null.
 * @param {Array<object>} payMethods - an array of pay-method objects.
 * @param {string} payMethodUri - a pay method uri.
 */
export function getPayMethodFromUri(payMethods, payMethodUri) {
  var matches = payMethods.filter(item => payMethodUri === item.resource_uri);
  if (matches.length > 1) {
    throw new Error('Pay methods should be unique. ' +
      'Found more than one matching ' + payMethodUri);
  }
  return matches.length ? matches[0] : null;
}
