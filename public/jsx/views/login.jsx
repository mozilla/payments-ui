'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;
var Connector = require('redux/react').Connector;

var userActions = require('user-actions');
var Spinner = require('components/spinner');
var gettext = require('utils').gettext;
var reduxConfig = require('redux-config');


module.exports = React.createClass({

  displayName: 'LoginView',
  mixins: [Navigation],

  contextTypes: {
    router: React.PropTypes.func,
  },

  componentDidMount: function() {
    var { router } = this.context;
    var defer = userActions.signIn(router.getCurrentQuery().access_token);
    defer(reduxConfig.default.dispatch);
  },

  selectData: function(state) {
    console.log('login: selectData() firing with', state);
    return {
      user: state.user,
    }
  },

  watchUser: function(user) {
    if (!user) {
      console.log('user is not signed in');
      return;
    }
    console.log('current user is signed in; continuing to card-listing');
    this.transitionTo('card-listing');
  },

  render: function() {
    var component = this;
    return (
      <Connector select={component.selectData}>
        {function(result) {
          console.log('login: rendering after state change', result);
          component.watchUser(result.user);
          return <Spinner text={gettext('Logging in')}/>;
        }}
      </Connector>
    );
  },

});
