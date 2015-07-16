var settings = require('../public/js/settings');

module.exports = {
  default: { // Target name.
    options: {
      template: '../payments-l10n/locale/templates/LC_MESSAGES/payments-ui.pot',
      languages: settings.supportedLanguages,
      localeDir: 'locale',
    }
  }
};
