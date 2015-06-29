var settings = require('../public/js/settings');

module.exports = {
  default: { // Target name.
    options: {
      template: 'locale/templates/LC_MESSAGES/messages.pot',
      languages: settings.supportedLanguages,
      localeDir: 'locale',
    }
  }
};
