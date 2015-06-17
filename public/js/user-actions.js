'use strict';

var $ = require('jquery');
var assign = require('object-assign');

var dispatcher = require('dispatcher');

//
// A helper object to perform user-related actions.
// Each action will dispatch messages so that stores can
// update their state accordingly.
//

module.exports = assign({}, {

  signIn: function(accessToken) {

    $.ajax({
      data: {
        access_token: accessToken,
      },
      method: 'post',
      url: '/api/auth/sign-in/',
      context: this,
    }).then(function(data) {

      console.log('login succeeded');
      this.setCurrentUser({
        email: data.buyer_email,
        is_logged_in: true,
      });

      console.log('setting CSRF token for subsequent requests:',
                  data.csrf_token);
      $.ajaxSetup({
        headers: {
          'X-CSRFToken': data.csrf_token,
        },
      });

    }).fail(function() {

      console.log('login failed');
      this.setCurrentUser({
        email: null,
        is_logged_in: false,
      });
    });
  },

  setCurrentUser: function(user) {
    console.log('UserActions: setting current user', user);
    dispatcher.dispatch({
      actionType: 'set-user',
      user: user,
    });
  },

});
