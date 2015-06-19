'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var AppStore = require('app-store');
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
      error: AppStore.getError(),
      productId: productId,
    };
  },

  componentDidMount: function() {
    AppStore.addErrorListener(this.onError);
  },

  componentWillUnmount: function() {
    AppStore.removeErrorListener(this.onError);
  },

  onError: function() {
    this.setState({error: AppStore.getError()});
  },

  render () {
    var img = {
        backgroundImage: 'url(' + products[this.state.productId].img + ')',
    };
    return (
      <main>
        <div id="logo" style={img}></div>
        {
          this.state.error ?
            <ErrorMessage /> :
            <RouteHandler productId={this.state.productId} />
        }
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
      // Doesn't actually render anything.
      React.render(<Root/>, document.body);
    });
  },
};
