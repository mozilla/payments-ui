'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var CardDetails = require('views/card-details');
var Login = require('views/login');

var App = React.createClass({
  displayName: 'App',
  render () {
    return (
      <RouteHandler/>
    );
  },
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route name="login" path="/" handler={Login}/>
    <Route name="card-form" path="/payment-card/" handler={CardDetails}/>
  </Route>
);

module.exports = {
  init: function() {
    Router.run(routes, Router.HistoryLocation, function(Root) {
      // Doesn't actually render anything.
      React.render(<Root/>, document.body);
    });
  },
};
