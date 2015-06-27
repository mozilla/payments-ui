'use strict';

var React = require('react');
var Provider = require('redux/react').Provider;
var Connector = require('redux/react').Connector;
var bindActionCreators = require('redux').bindActionCreators;

var reduxConfig = require('redux-config');
var ErrorMessage = require('components/error');
var Login = require('views/login');
var Purchase = require('views/purchase');
var userActions = require('user-actions');

var products = require('products');


function parseQuery(url) {
  // TODO: replace with querystring library or something.
  var urlParts = url.split('?');
  var query;
  var data = {};

  if (urlParts.length > 1) {
    query = urlParts[1].split('&');

    query.forEach(function(nameVal) {
      var parts = nameVal.split('=');
      data[parts[0]] = decodeURIComponent(parts[1] || '');
    });
  }

  return data;
}


var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    var qs = parseQuery(window.location.href);
    // TODO: we should validate/clean this input to raise early errors.
    return {
      accessToken: qs.access_token,
      productId: qs.product,
    };
  },

  selectData: function(state) {
    return {
      app: state.app,
      user: state.user,
    };
  },

  render () {
    var state = this.state;
    var img = {
      backgroundImage: 'url(' + products[this.state.productId].img + ')',
    };
    return (
      <main>
        <div id="logo" style={img}></div>
        <Connector select={this.selectData}>
          {function(result) {
            if (result.app.error) {
              console.log('rendering app error');
              return <ErrorMessage error={result.app.error} />;
            } else if (!result.user.signedIn) {
              console.log('rendering login');
              return (
                <Login
                  accessToken={state.accessToken}
                  {...bindActionCreators(userActions, result.dispatch) }
                />
              );
            } else {
              console.log('rendering purchase flow');
              return (
                <Purchase user={result.user} productId={state.productId} />
              );
            }
          }}
        </Connector>
      </main>
    );
  },
});


module.exports = {
  component: App,
  init: function() {
    React.render((
      <Provider redux={reduxConfig.default}>
        {function() {
          return <App/>;
        }}
      </Provider>
    ), document.body);
  },
};
