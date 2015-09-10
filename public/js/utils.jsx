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


export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }

  var parts = email.split('@');
  var localLength = parts[0] && parts[0].length;
  var domainLength = parts[1] && parts[1].length;

  // Original regexp from:
  //  http://blog.gerv.net/2011/05/html5_email_address_regexp/
  // Modified to remove the length checks, which are done later.
  // IETF spec: http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
  // NOTE: this does *NOT* allow internationalized domain names.
  /* eslint-disable max-len */
  return (/^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d][a-z\d\-]*(?:\.[a-z\d][a-z\d\-]*)*$/i).test(email) &&
  /* eslint-enable */
    // total email allowed to be 254 bytes long
    // see http://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
    email.length <= 254 &&
    // local side only allowed to be 64 bytes long
    localLength >= 1 && localLength <= 64 &&
    // domain side allowed to be up to 255 bytes long which
    // doesn't make much sense unless the local side has 0 length;
    domainLength >= 1 && domainLength <= 255;
}


export function validateEmailAsYouType(email) {
  var invalidEmail = {
    isPotentiallyValid: false,
    isValid: false,
  };
  if (typeof email !== 'string') {
    return invalidEmail;
  }
  var parts = email.split('@');
  if (parts.length === 2 && parts[0] && parts[1]) {
    if (isValidEmail(email)) {
      return {
        isPotentiallyValid: true,
        isValid: true,
      };
    } else {
      return invalidEmail;
    }
  } else if (parts.length > 2) {
    return invalidEmail;
  } else {
    return {
      isPotentiallyValid: true,
      isValid: false,
    };
  }
}

export function arrayHasSubString(list, searchSubString) {
  for (var i = 0; i < list.length; i += 1) {
    var item = list[i] || '';
    if (item.indexOf(searchSubString) > -1) {
      return true;
    }
  }
  return false;
}

export function getId({prefix=''} = {}) {
  return prefix + '_' + Math.random().toString(36).substr(2, 9);
}
