'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Provider = require('redux/react').Provider;
var Connector = require('redux/react').Connector;

var reduxConfig = require('redux-config');
var CardDetails = require('views/card-details');
var CardListing = require('views/card-listing');
var CompletePayment = require('views/complete-payment');
var ErrorMessage = require('components/error');
var Login = require('views/login');

var products = require('products');


var App = React.createClass({

  displayName: 'App',

  contextTypes: {
    router: React.PropTypes.func,
  },

  getInitialState: function() {
    var {router} = this.context;
    var productId = router.getCurrentQuery().product;

    return {
      productId: productId,
    };
  },

  selectData: function(state) {
    return {
      app: state.app,
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
            } else {
              console.log('rendering app route handler');
              return <RouteHandler productId={state.productId} />;
            }
          }}
        </Connector>
      </main>
    );
  },
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route name="login" path="/" handler={Login}/>
    <Route name="card-form" path="/payment/card/" handler={CardDetails}/>
    <Route
      name="complete" path="/payment/complete/" handler={CompletePayment}/>
    <Route
      name="card-listing" path="/payment/card-list/" handler={CardListing}/>
  </Route>
);

module.exports = {
  component: App,
  init: function() {
    Router.run(routes, Router.HashLocation, function(Root) {
      React.render((
        <Provider redux={reduxConfig.default}>
          {function() {
            return <Root/>;
          }}
        </Provider>
      ), document.body);
    });
  },
};
