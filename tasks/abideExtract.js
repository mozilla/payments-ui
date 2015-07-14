module.exports = {
   js: {
     src: [
       'public/dist/*.js',
     ],
     dest: '../payments-l10n/locale/templates/LC_MESSAGES/payments-ui.pot',
     options: {
       language: 'JavaScript',
     }
   },
};
