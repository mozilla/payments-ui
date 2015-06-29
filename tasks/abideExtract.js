module.exports = {
   js: {
     src: [
       'public/dist/*.js',
     ],
     dest: 'locale/templates/LC_MESSAGES/messages.pot',
     options: {
       language: 'JavaScript',
     }
   },
};
