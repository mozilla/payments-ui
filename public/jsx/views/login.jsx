'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;

var UserActions = require('user-actions');
var UserStore = require('user-store');
var Spinner = require('components/spinner');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'LoginView',
  mixins: [Navigation],

  contextTypes: {
    router: React.PropTypes.func,
  },

  componentDidMount: function() {
    var { router } = this.context;
    UserStore.addSetUserListener(this.onSetUser);
    UserActions.signIn(router.getCurrentQuery().access_token);
  },

  componentWillUnmount: function() {
    UserStore.removeSetUserListener(this.onSetUser);
  },

  onSetUser: function() {
    if (!this.isMounted()) {
      console.log('ignoring events while unmounted');
      return;
    }
    var user = UserStore.getCurrentUser();
    if (user.is_logged_in) {
      console.log('current user is logged in; continuing to card-listing');
      this.transitionTo('card-listing');
    } else if (!user.is_logged_in) {
      // TODO: some error state.
      console.error('user did not log in successfully');
    }
  },

  render: function() {
    return <Spinner text={gettext('Logging in')}/>;
  },

});
