module.exports = {
  'supportedLanguages': [
    'ca',
    'cs',
    'cy',
    'da',
    'de',
    'dsb',
    'en',
    'es',
    'es-AR',
    'es-CL',
    'et',
    'eu',
    'ff',
    'fr',
    'fy',
    'he',
    'hsb',
    'hu',
    'id',
    'it',
    'ja',
    'ko',
    'lt',
    'nb-NO',
    'nl',
    'pa',
    'pl',
    'pt',
    'pt-BR',
    'rm',
    'ru',
    'sk',
    'sl',
    'sq',
    'sr',
    'sr-LATN',
    'sv',
    'sv-SE',
    'tr',
    'uk',
    'zh-CN',
    'zh-TW',
  ],
  tracking: {
    enabled: false,
    id: 'UA-35433268-60',
  },
  // FxA relier client IDs for user sign-in (not token sign in).
  // These are docker development client IDs mapped by host.
  fxaClientIdMap: {
    'pay.dev:8000': '8d7c6c8549cc6deb',
    'pay.webpack:8080': 'a63657a4c78dd650',
  },
  fxaRedirectUri: 'http://pay.dev:8000',
  fxaContentHost: 'https://stable.dev.lcip.org',
  fxaOauthHost: 'https://oauth-stable.dev.lcip.org/v1',

  apiPrefix: 'http://pay.dev:8000/api',
  allowCORSRequests: false,
};


if (typeof window !== 'undefined') {
  var host = window.location.host;
  module.exports.fxaClientId = module.exports.fxaClientIdMap[host];

  if (!module.exports.fxaClientId) {
    console.warn('no FxA client ID has been configured for host ' + host);
  } else {
    // At this point we have a client ID which means the app is running
    // on a known, whitelisted host. It is ok to allow CORS requests
    // but note that the API server still has to support our host.
    console.info('app is on a known host; we will allow CORS requests');
    module.exports.allowCORSRequests = true;
  }

} else {
  console.warn('probably not in a web browser; skipping some configuration');
}
