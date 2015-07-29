import 'shims';

import React, { Component, PropTypes } from 'react';
import { Provider, Connector } from 'react-redux';
import { bindActionCreators } from 'redux';

import dataStore from 'data-store';
import * as managementActions from 'actions/management';
import * as userActions from 'actions/user';
import { parseQuery } from 'utils';

import ModalError from 'views/modal-error';
import { default as DefaultManagement } from 'views/management';
import { default as DefaultPayMethods } from 'views/pay-methods';


export default class ManagementApp extends Component {

  static propTypes = {
    Management: PropTypes.element,
    PayMethods: PropTypes.element,
    window: PropTypes.object,
  }

  static defaultProps = {
    Management: DefaultManagement,
    PayMethods: DefaultPayMethods,
    window: window,
  }

  selectData(state) {
    return {
      management: state.management,
      user: state.user,
    };
  }

  renderChild(connector) {
    var qs = parseQuery(this.props.window.location.href);
    var accessToken = qs.access_token;
    var boundMgmtActions = bindActionCreators(managementActions,
                                              connector.dispatch);
    var boundUserActions = bindActionCreators(userActions, connector.dispatch);
    var children = [];
    var Management = this.props.Management;
    var PayMethods = this.props.PayMethods;

    if (connector.management.error) {
      children.push(
        <ModalError {...boundMgmtActions} error={connector.management.error} />
      );
    } else if (connector.management.paymentMethods) {
      children.push((
        <PayMethods {...boundMgmtActions}
          paymentMethods={connector.management.paymentMethods} />
      ));
    }

    children.push(<Management {...boundMgmtActions} {...boundUserActions}
                              accessToken={accessToken}
                              user={connector.user} />);

    return <div>{children}</div>;
  }

  render() {
    return (
      <main>
        <Connector select={this.selectData}>
          {(connector) => this.renderChild(connector)}
        </Connector>
      </main>
    );
  }
}


export function init() {
  React.render((
    <Provider store={dataStore}>
      {() => <ManagementApp/>}
    </Provider>
  ), document.body);
}
