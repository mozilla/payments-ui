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

import Spinner from 'components/spinner';
import AddPayMethod from 'views/management/add-pay-method';
import DelPayMethod from 'views/management/del-pay-method';
import MyAccount from 'views/management/my-account';
import Subscriptions from 'views/management/subscriptions';
import History from 'views/management/history';
import { default as DefaultPayMethods } from 'views/management/pay-methods';

import BraintreeToken from 'views/shared/braintree-token';
import ModalError from 'views/shared/modal-error';

import { default as DefaultManagement } from 'views/management';


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
    } else if (connector.management.view === 'SHOW_MY_ACCOUNT') {
      console.log('Showing pay methods');
      children.push((
        <MyAccount
          {...boundUserActions}
          user={connector.user}
        />
      ));
    } else if (connector.management.view === 'SHOW_PAY_METHODS') {
      console.log('Showing pay methods');
      children.push((
        <PayMethods {...boundMgmtActions}
          payMethods={connector.user.payMethods} />
      ));
    } else if (connector.management.view === 'SHOW_ADD_PAY_METHOD') {
      if (!connector.user.braintreeToken) {
        children.push((
          <BraintreeToken {...boundUserActions} />
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
    } else if (connector.management.view === 'SHOW_DEL_PAY_METHOD') {
      children.push((
        <DelPayMethod
          payMethods={connector.user.payMethods}
          {...boundMgmtActions}
          {...boundPayMethodActions}
        />
      ));
    } else if (connector.management.view === 'SHOW_SUBSCRIPTIONS') {
      children.push((
        <Subscriptions
          {...boundSubscriptionActions}
          userSubscriptions={connector.user.subscriptions}
        />
      ));
    } else if (connector.management.view === 'SHOW_HISTORY') {
      children.push((
        <History />
      ));
    } else {
      children.push(<Spinner/>);
    }


    return (<Management
              {...boundMgmtActions}
              {...boundUserActions}
              accessToken={accessToken}
              tab={connector.management.tab}
              view={connector.management.view}
              user={connector.user}
            >{children}</Management>);
  }

  render() {
    return (
      <Connector select={this.selectData}>
        {(connector) => this.renderChild(connector)}
      </Connector>
    );
  }
}


export function init() {
  React.render((
    <Provider store={dataStore}>
      {() => <ManagementApp/>}
    </Provider>
  ), document.getElementById('placeholder'));
}
