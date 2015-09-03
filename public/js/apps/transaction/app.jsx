import 'shims';

import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorMessage from 'components/error';
import DefaultSignIn from 'views/shared/sign-in';
import DefaultTransaction from 'views/transaction';

import * as appActions from 'actions/app';
import * as userActions from 'actions/user';
import * as products from 'products';
import { parseQuery } from 'utils';


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
    var qs = parseQuery(props.win.location.href);
    // TODO: we should validate/clean this input to raise early errors.
    this.state = {
      accessToken: qs.access_token,
      productId: qs.product,
      // This is an amount to pay, which applies to things like donations.
      userDefinedAmount: qs.amount,
    };
  }

  renderChild() {
    var { app, user, dispatch } = this.props;

    var state = this.state;
    var SignIn = this.props.SignIn;
    var Transaction = this.props.Transaction;
    var product = products.get(state.productId);
    var signInRequired = product.seller.kind !== 'donations';
    console.log('sign-in required to transact product?', state.productId,
                signInRequired ? 'Yes' : 'No');

    if (app.error) {
      console.log('rendering app error');
      return <ErrorMessage error={app.error} />;
    } else if (signInRequired && !user.signedIn) {
      console.log('rendering sign-in');
      return (
        <SignIn
          accessToken={state.accessToken}
          allowUserSignIn={false}
          user={user}
          {...bindActionCreators(userActions, dispatch) }
          {...bindActionCreators(appActions, dispatch) }
        />
      );
    } else {
      console.log('rendering purchase flow');
      return (
        <Transaction
          productId={state.productId}
          userDefinedAmount={state.userDefinedAmount}
        />
      );
    }
  }

  render() {
    return (
      <main>
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
