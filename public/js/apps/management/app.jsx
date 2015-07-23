import 'shims';

import React, { Component } from 'react';
import { Provider, Connector } from 'redux/react';
import { bindActionCreators } from 'redux';

import reduxConfig from 'redux-config';
import * as managementActions from 'actions/management';
import * as userActions from 'actions/user';

import ModalError from 'views/modal-error';
import Management from 'views/management';
import ManageCards from 'views/manage-cards';


export default class ManagementApp extends Component {

  selectData(state) {
    return {
      management: state.management,
      user: state.user,
    };
  }

  renderChild(connector) {
    var boundMgmtActions = bindActionCreators(managementActions,
                                              connector.dispatch);
    var boundUserActions = bindActionCreators(userActions, connector.dispatch);
    var children = [];
    if (connector.management.error) {
      children.push(
        <ModalError {...boundMgmtActions} error={connector.management.error} />
      );
    } else if (connector.management.paymentMethods) {
      children.push((
        <ManageCards {...boundMgmtActions}
          paymentMethods={connector.management.paymentMethods} />
      ));
    }

    children.push(<Management {...boundMgmtActions} {...boundUserActions}
                              user={connector.user} />);

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
