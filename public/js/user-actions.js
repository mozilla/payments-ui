'use strict';

var $ = require('jquery');
var assign = require('object-assign');

var actionTypes = require('action-types');
var appActions = require('app-actions');


module.exports = assign({}, {

  signIn: function(accessToken) {
    return function(dispatch) {
      $.ajax({
        data: {
          access_token: accessToken,
        },
        method: 'post',
        url: '/api/auth/sign-in/',
        context: this,
      }).then(function(data) {

        console.log('setting CSRF token for subsequent requests:',
                    data.csrf_token);
        $.ajaxSetup({
          headers: {
            'X-CSRFToken': data.csrf_token,
          },
        });

        console.log('login succeeded, setting user');
        dispatch({
          type: actionTypes.USER_SIGNED_IN,
          user: {
            email: data.buyer_email,
            payment_methods: data.payment_methods,
          },
        });

      }).fail(function() {

        console.log('login failed');
        dispatch(appActions.error('user login failed'));

      });
    };
  },

});
