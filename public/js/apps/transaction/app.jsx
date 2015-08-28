import 'shims';

import React, { Component, PropTypes } from 'react';

import { Connector, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import dataStore from 'data-store';
import ErrorMessage from 'components/error';
import DefaultSignIn from 'views/shared/sign-in';
import DefaultTransaction from 'views/transaction';

import * as appActions from 'actions/app';
import * as userActions from 'actions/user';
import * as products from 'products';
import { parseQuery } from 'utils';


export default class TransactionApp extends Component {

  static propTypes = {
    SignIn: PropTypes.func.isRequired,
    Transaction: PropTypes.func.isRequired,
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

  selectData(state) {
    return {
      app: state.app,
      user: state.user,
    };
  }

  render() {
    var state = this.state;
    var SignIn = this.props.SignIn;
    var Transaction = this.props.Transaction;
    var product = products.get(state.productId);
    var signInRequired = product.seller.kind !== 'donations';
    console.log('sign-in required to transact product?', state.productId,
                signInRequired ? 'Yes' : 'No');

    return (
      <main>
        <Connector select={this.selectData}>
          {connector => {
            if (connector.app.error) {
              console.log('rendering app error');
              return <ErrorMessage error={connector.app.error} />;
            } else if (signInRequired && !connector.user.signedIn) {
              console.log('rendering sign-in');
              return (
                <SignIn
                  accessToken={state.accessToken}
                  allowUserSignIn={false}
                  user={connector.user}
                  {...bindActionCreators(userActions, connector.dispatch) }
                  {...bindActionCreators(appActions, connector.dispatch) }
                />
              );
            } else {
              console.log('rendering purchase flow');
              return (
                <Transaction
                  productId={state.productId}
                  user={connector.user}
                  userDefinedAmount={state.userDefinedAmount}
                />
              );
            }
          }}
        </Connector>
      </main>
    );
  }
}


export function init() {
  React.render((
    <Provider store={dataStore}>
      {function() {
        return <TransactionApp/>;
      }}
    </Provider>
  ), document.body);
}
