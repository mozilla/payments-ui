'use strict';

var $ = require('jquery');
var assign = require('object-assign');

var AppActions = require('app-actions');
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

      console.log('login succeeded, setting user');
      this.setSignedInUser({
        email: data.buyer_email,
        payment_methods: data.payment_methods,
      });

      console.log('setting CSRF token for subsequent requests:',
                  data.csrf_token);
      $.ajaxSetup({
        headers: {
          'X-CSRFToken': data.csrf_token,
        },
      });

    }).fail(function() {

      AppActions.setError('user login failed');

    });
  },

  setSignedInUser: function(user) {
    console.log('UserActions: setting signed in user', user);
    dispatcher.dispatch({
      actionType: 'user-signed-in',
      user: user,
    });
  },

});
