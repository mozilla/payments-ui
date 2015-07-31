import 'shims';

import React, { Component, PropTypes } from 'react';
import { Provider, Connector } from 'react-redux';
import { bindActionCreators } from 'redux';

import dataStore from 'data-store';
import * as mgmtActions from 'actions/management';
import * as payMethodActions from 'actions/pay-methods';
import * as userActions from 'actions/user';
import * as subscriptionActions from 'actions/subscriptions';
import { parseQuery } from 'utils';

import Modal from 'components/modal';

import AddPayMethod from 'views/add-pay-method';
import DelPayMethod from 'views/del-pay-method';
import BraintreeToken from 'views/braintree-token';
import ModalError from 'views/modal-error';

import { default as DefaultManagement } from 'views/management';
import { default as DefaultPayMethods } from 'views/pay-methods';


export default class ManagementApp extends Component {

  static propTypes = {
    Management: PropTypes.func.isRequired,
    PayMethods: PropTypes.func.isRequired,
    window: PropTypes.object.isRequired,
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
    console.log('rendering management app at tab:', connector.management.tab);
    var qs = parseQuery(this.props.window.location.href);
    var accessToken = qs.access_token;
    var boundMgmtActions = bindActionCreators(mgmtActions,
                                              connector.dispatch);
    var boundUserActions = bindActionCreators(userActions, connector.dispatch);
    var boundSubscriptionActions = bindActionCreators(subscriptionActions,
                                                      connector.dispatch);
    var boundPayMethodActions = bindActionCreators(payMethodActions,
                                                   connector.dispatch);
    var children = [];
    var Management = this.props.Management;
    var PayMethods = this.props.PayMethods;

    if (connector.management.error) {
      children.push(
        <ModalError {...boundMgmtActions} error={connector.management.error} />
      );
    } else if (connector.management.tab === 'SHOW_PAY_METHODS') {
      console.log('Showing pay methods');
      children.push((
        <PayMethods {...boundMgmtActions}
          payMethods={connector.user.payMethods} />
      ));
    } else if (connector.management.tab === 'SHOW_ADD_PAY_METHOD') {
      if (!connector.user.braintreeToken) {
        children.push((
          <Modal {...boundMgmtActions}>
            <BraintreeToken {...boundUserActions} />
          </Modal>
        ));
      } else {
        children.push((
          <AddPayMethod
            {...boundMgmtActions}
            {...boundPayMethodActions}
            {...boundUserActions}
            braintreeToken={connector.user.braintreeToken}
          />
        ));
      }
    } else if (connector.management.tab === 'SHOW_DEL_PAY_METHOD') {
      children.push((
        <DelPayMethod
          payMethods={connector.user.payMethods}
          {...boundMgmtActions}
          {...boundPayMethodActions}
          {...boundUserActions}
        />
      ));
    }

    children.push(<Management
                    {...boundMgmtActions}
                    {...boundPayMethodActions}
                    {...boundSubscriptionActions}
                    {...boundUserActions}
                    accessToken={accessToken}
                    user={connector.user}
                    userSubscriptions={connector.user.subscriptions}
                  />);

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
