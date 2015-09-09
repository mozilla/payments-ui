import 'shims';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as notificationActions from 'actions/notifications';
import * as mgmtActions from 'actions/management';
import * as payMethodActions from 'actions/pay-methods';
import * as userActions from 'actions/user';
import * as subscriptionActions from 'actions/subscriptions';
import * as transactionActions from 'actions/transaction';
import { parseQuery } from 'utils';

import AddPayMethod from 'views/management/add-pay-method';
import DelPayMethod from 'views/management/del-pay-method';
import ConfirmDelPayMethod from 'views/management/confirm-del-pay-method';
import MyAccount from 'views/management/my-account';
import Subscriptions from 'views/management/subscriptions';
import History from 'views/management/history';
import { default as DefaultPayMethods } from 'views/management/pay-methods';

import BraintreeToken from 'views/shared/braintree-token';
import ModalError from 'views/shared/modal-error';
import NotificationList from 'components/notification-list';
import { default as DefaultSignIn } from 'views/shared/sign-in';
import SignOut from 'views/shared/sign-out';

import { default as DefaultManagement } from 'views/management';


export default class ManagementApp extends Component {

  static propTypes = {
    Management: PropTypes.func,
    PayMethods: PropTypes.func,
    SignIn: PropTypes.func,
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    management: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    window: PropTypes.object.isRequired,
  }

  static defaultProps = {
    Management: DefaultManagement,
    PayMethods: DefaultPayMethods,
    SignIn: DefaultSignIn,
    window: window,
  }

  render() {
    const { app, dispatch, management, user } = this.props;

    console.log('rendering management app at tab:', management.tab);
    var qs = parseQuery(this.props.window.location.href);
    var accessToken = qs.access_token;
    var boundNotifyActions = bindActionCreators(notificationActions,
                                                dispatch);
    var boundMgmtActions = bindActionCreators(mgmtActions,
                                              dispatch);
    var boundUserActions = bindActionCreators(userActions, dispatch);
    var boundSubscriptionActions = bindActionCreators(subscriptionActions,
                                                      dispatch);
    var boundPayMethodActions = bindActionCreators(payMethodActions,
                                                   dispatch);
    var boundTransactionActions = bindActionCreators(transactionActions,
                                                     dispatch);
    var children = [];
    var Management = this.props.Management;
    var PayMethods = this.props.PayMethods;
    var SignIn = this.props.SignIn;

    children.push(
      <NotificationList
        notifications={app.notifications}
        {...boundNotifyActions}
      />
    );

    if (app.error) {
      children.push(
        <ModalError {...boundMgmtActions} error={app.error} />
      );
    } else if (management.view === 'SHOW_MY_ACCOUNT') {
      console.log('Showing pay methods');
      children.push((
        <MyAccount
          {...boundUserActions}
          user={user}
        />
      ));
    } else if (management.view === 'SHOW_PAY_METHODS') {
      console.log('Showing pay methods');
      children.push((
        <PayMethods {...boundMgmtActions}
          {...boundPayMethodActions}
          payMethods={user.payMethods} />
      ));
    } else if (management.view === 'SHOW_SIGN_OUT') {
      console.log('Showing sign out');
      children.push((
        <SignOut
          user={user}
          {...boundUserActions}
          {...boundMgmtActions}
        />
      ));
    } else if (management.view === 'SHOW_ADD_PAY_METHOD') {
      if (!user.braintreeToken) {
        children.push((
          <BraintreeToken {...boundUserActions} />
        ));
      } else {
        children.push((
          <AddPayMethod
            {...boundMgmtActions}
            {...boundPayMethodActions}
            {...boundUserActions}
            braintreeToken={user.braintreeToken}
          />
        ));
      }
    } else if (management.view === 'SHOW_DEL_PAY_METHOD') {
      children.push((
        <DelPayMethod
          payMethods={user.payMethods}
          {...boundMgmtActions}
          {...boundPayMethodActions}
        />
      ));
    } else if (management.view === 'SHOW_CONFIRM_DEL_PAY_METHOD') {
      var mgmt = management;
      children.push((
        <ConfirmDelPayMethod
          payMethods={user.payMethods}
          payMethodUri={mgmt.viewData.payMethodUri}
          affectedSubscriptions={mgmt.viewData.affectedSubscriptions}
          {...boundMgmtActions}
          {...boundPayMethodActions}
          {...boundSubscriptionActions}
        />
      ));
    } else if (management.view === 'SHOW_SUBS') {
      children.push((
        <Subscriptions
          {...boundSubscriptionActions}
          payMethods={user.payMethods}
          userSubscriptions={user.subscriptions}
        />
      ));
    } else if (management.view === 'SHOW_HISTORY') {
      children.push((
        <History
          transactions={user.transactions}
          {...boundTransactionActions}
        />
      ));
    } else {
      console.log('Showing sign in');
      children.push(
        <SignIn
          accessToken={accessToken}
          user={user}
          {...boundUserActions}
          {...boundMgmtActions}
        />
      );
    }

    return (<Management
              {...boundMgmtActions}
              {...boundUserActions}
              tab={management.tab}
              user={user}
              view={management.view}>
                {children}
            </Management>);
  }
}


function select(state) {
  return {
    app: state.app,
    management: state.management,
    user: state.user,
  };
}


export default connect(select)(ManagementApp);
