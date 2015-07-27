import 'shims';

import React, { Component, PropTypes } from 'react';
import { Provider, Connector } from 'react-redux';
import { bindActionCreators } from 'redux';

import reduxConfig from 'redux-config';
import * as managementActions from 'actions/management';
import * as userActions from 'actions/user';
import { parseQuery } from 'utils';

import ModalError from 'views/modal-error';
import { default as DefaultManagement } from 'views/management';
import { default as DefaultManageCards } from 'views/manage-cards';


export default class ManagementApp extends Component {

  static propTypes = {
    ManageCards: PropTypes.element,
    Management: PropTypes.element,
    window: PropTypes.object,
  }

  static defaultProps = {
    ManageCards: DefaultManageCards,
    Management: DefaultManagement,
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
    var ManageCards = this.props.ManageCards;

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
    <Provider store={reduxConfig}>
      {() => <ManagementApp/>}
    </Provider>
  ), document.body);
}
