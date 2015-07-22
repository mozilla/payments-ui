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

  renderChild(connector) {
    var actions = bindActionCreators(managementActions, connector.dispatch);
    var children = [];

    if (connector.management.error) {
      children.push(
        <ModalError {...actions} error={connector.management.error} />
      );
    } else if (connector.management.paymentMethods) {
      children.push((
        <ManageCards {...actions}
          paymentMethods={connector.management.paymentMethods} />
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
