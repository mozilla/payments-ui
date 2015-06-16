'use strict';

var $ = require('jquery');
var assign = require('object-assign');

var dispatcher = require('dispatcher');


function UserActions(localDispatcher) {
  //
  // A helper object to perform user-related actions.
  // Each action will dispatch messages so that stores can
  // update their state accordingly.
  //
  this.dispatcher = localDispatcher;
}


UserActions.prototype = assign({}, {

  signIn: function(accessToken, opt) {
    opt = opt || {};
    if (!opt.jquery) {
      opt.jquery = $;
    }

    opt.jquery.ajax({
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
      opt.jquery.ajaxSetup({
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
    this.dispatcher.dispatch({
      actionType: 'set-user',
      user: user,
    });
  },

});


module.exports = new UserActions(dispatcher);
module.exports.Class = UserActions;
