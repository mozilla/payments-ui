'use strict';

var React = require('react');
var Provider = require('redux/react').Provider;
var Connector = require('redux/react').Connector;
var bindActionCreators = require('redux').bindActionCreators;

var reduxConfig = require('redux-config');
var managementActions = require('actions/management');

var ModalError = require('views/modal-error');
var Management = require('views/management');
var ManageCards = require('views/manage-cards');


var App = React.createClass({

  displayName: 'ManagementApp',

  selectData: function(state) {
    return {
      management: state.management,
    };
  },

  renderChild(result) {
    var actions = bindActionCreators(managementActions, result.dispatch);
    var children = [];

    if (result.management.error) {
      children.push(
        <ModalError {...actions} error={result.management.error} />
      );
    } else if (result.management.paymentMethods) {
      children.push((
        <ManageCards {...actions}
          paymentMethods={result.management.paymentMethods} />
      ));
    }
    children.push(<Management {...actions} />);
    return <div>{children}</div>;
  },

  render () {
    return (
      <main>
        <Connector select={this.selectData}>
          {this.renderChild}
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
