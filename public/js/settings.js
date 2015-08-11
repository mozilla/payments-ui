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

  // FxA client ID (configured per host).
  // This is used for user sign-in, not token sign in.
  // The payments-service API must be configured with each
  // corresponding secret.
  fxaClientId: undefined,
  fxaRedirectUri: undefined,
  fxaContentHost: 'https://stable.dev.lcip.org',
  fxaOauthHost: 'https://oauth-stable.dev.lcip.org/v1',
  apiPrefix: '/api',
  allowCORSRequests: false,

  // This is a map of custom settings that will be defined
  // based on host.
  hostSettings: {
    'pay.dev.mozaws.net': {
      fxaClientId: '90f432a069a26c77',
      fxaRedirectUri: 'http://pay.dev.mozaws.net/',
    },
    // These are only used locally for docker.
    'pay.dev:8000': {
      fxaClientId: '8d7c6c8549cc6deb',
      fxaRedirectUri: 'http://pay.dev:8000',
    },
    'pay.webpack:8080': {
      fxaClientId: 'a63657a4c78dd650',
      fxaRedirectUri: 'http://pay.webpack:8080',
      // Webpack needs to talk via CORS to the dev API.
      // See payments-service for how this is allowed.
      apiPrefix: 'http://pay.dev:8000/api',
      allowCORSRequests: true,
    },
  },
};


if (typeof window !== 'undefined') {
  var host = window.location.host;
  var hostSettings = module.exports.hostSettings[host];

  if (!hostSettings) {
    // For example, the unit tests are served by localhost which is unmapped.
    console.warn('no custom settings for host ' + host);
  } else {
    console.log('applying custom settings for host ' + host);
    for (var attr in hostSettings) {
      module.exports[attr] = hostSettings[attr];
    }
  }

} else {
  console.warn('probably not in a web browser; skipping host configuration');
}
