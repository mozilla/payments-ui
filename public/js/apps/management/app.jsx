import 'shims';

import React, { Component } from 'react';
import { Provider, Connector } from 'redux/react';
import { bindActionCreators } from 'redux';

import reduxConfig from 'redux-config';
import * as managementActions from 'actions/management';

import ModalError from 'views/modal-error';
import Management from 'views/management';
import ManageCards from 'views/manage-cards';


export default class ManagementApp extends Component {

  selectData(state) {
    return {
      management: state.management,
    };
  }

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
  }

  render() {
    return (
      <main>
        <Connector select={this.selectData}>
          {this.renderChild}
        </Connector>
      </main>
    );
  }
}


export function init() {
  React.render((
    <Provider redux={reduxConfig}>
      {function() {
        return <ManagementApp/>;
      }}
    </Provider>
  ), document.body);
}
