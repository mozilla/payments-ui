import 'babel-core/polyfill';

import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as errorCodes from 'constants/error-codes';
import Spinner from 'components/spinner';
import NotificationList from 'components/notification-list';

import DefaultSignIn from 'views/shared/sign-in';
import DefaultTransaction from 'views/transaction';

import * as notificationActions from 'actions/notifications';
import * as userActions from 'actions/user';
import * as products from 'products';
import { gettext, parseQuery } from 'utils';


export class TransactionApp extends Component {

  static propTypes = {
    SignIn: PropTypes.func.isRequired,
    Transaction: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    win: PropTypes.object,
  }

  static defaultProps = {
    SignIn: DefaultSignIn,
    Transaction: DefaultTransaction,
    win: window,
  }

  constructor(props) {
    super(props);
    this.boundUserActions = bindActionCreators(userActions, props.dispatch);
    this.boundNotificationActions = bindActionCreators(
      notificationActions, props.dispatch);
    var qs = parseQuery(props.win.location.href);

    var isValid = true;
    try {
      this.product = products.get(qs.product);
    } catch(e) {
      console.error('productId is invalid: ' + e);
      this.boundNotificationActions.showError({
        text: gettext('This product cannot be purchased'),
        errorCode: errorCodes.PRODUCT_ID_INVALID,
        userDismissable: false,
      });
      isValid = false;
    }

    this.state = {
      accessToken: qs.access_token,
      isValid: isValid,
      productId: qs.product,
      userDefinedAmount: qs.amount,
    };
  }

  renderChild() {
    var { user, SignIn, Transaction } = this.props;
    var state = this.state;

    if (!state.isValid) {
      // This renders a temporary loading state while we wait for
      // redux to re-render the component with an error to display.
      return <Spinner />;
    } else {

      var signInRequired = true;
      if (this.product.user_identification === null ||
          this.product.user_identification === 'email') {
        signInRequired = false;
      }
      console.log('sign-in required to transact product?', this.product.id, ':',
                  (signInRequired ? 'Yes' : 'No'), '; user_identification=',
                  this.product.user_identification);

      if (signInRequired && !user.signedIn) {
        console.log('rendering sign-in');
        return (
          <SignIn
            accessToken={state.accessToken}
            allowUserSignIn={false}
            user={user}
            {...this.boundUserActions }
            {...this.boundAppActions }
          />
        );
      } else {
        console.log('rendering purchase flow');
        return (
          <Transaction
            productId={this.product.id}
            userDefinedAmount={state.userDefinedAmount}
          />
        );
      }
    }
  }

  render() {
    var { app, dispatch } = this.props;
    var boundNotificationActions = bindActionCreators(
      notificationActions, dispatch);

    return (
      <main className="transaction">
        <NotificationList
          notifications={app.notifications}
          {...boundNotificationActions}
        />
        {this.renderChild()}
      </main>
    );
  }
}


function select(state) {
  return {
    app: state.app,
    user: state.user,
  };
}


export default connect(select)(TransactionApp);
