(function(){
  'use strict';

  // Use static path for runTime config.
  // When built with r.js it's all relative.
  var staticURL = '';
  if (typeof document !== 'undefined') {
    staticURL = document.body.getAttribute('data-static-url') || '';
  }

  var config = {
    baseUrl: staticURL + '/js',
    paths : {
      'require': '../lib/js/require',
      'card-validator': '../lib/js/card-validator.min',
      'formatter': '../lib/js/formatter.min',
      'jquery': '../lib/js/jquery.min',
    },
    shim : {
      'jquery': {
        exports: '$'
      }
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = config;
  } else if (typeof require.config !== 'undefined') {
    require.config(config);
  }
})();
