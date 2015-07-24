import 'shims';

import React, { Component, PropTypes } from 'react';

import { Connector, Provider } from 'redux/react';
import { bindActionCreators } from 'redux';

import reduxConfig from 'redux-config';
import ErrorMessage from 'components/error';
import Login from 'views/login';
import Purchase from 'views/purchase';
import * as userActions from 'actions/user';
import { parseQuery } from 'utils';


export default class PaymentApp extends Component {

  static propTypes = {
    Login: PropTypes.object,
    Purchase: PropTypes.object,
    win: PropTypes.object,
  }

  static defaultProps = {
    Login: Login,
    Purchase: Purchase,
    win: window,
  }

  constructor(props) {
    super(props);
    var qs = parseQuery(props.win.location.href);
    // TODO: we should validate/clean this input to raise early errors.
    this.state = {
      accessToken: qs.access_token,
      productId: qs.product,
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
    var Login_ = this.props.Login;
    var Purchase_ = this.props.Purchase;

    return (
      <main>
        <Connector select={this.selectData}>
          {function(result) {
            if (result.app.error) {
              console.log('rendering app error');
              return <ErrorMessage error={result.app.error} />;
            } else if (!result.user.signedIn) {
              console.log('rendering login');
              return (
                <Login_
                  accessToken={state.accessToken}
                  {...bindActionCreators(userActions, result.dispatch) }
                />
              );
            } else {
              console.log('rendering purchase flow');
              return (
                <Purchase_ user={result.user} productId={state.productId} />
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
    <Provider redux={reduxConfig}>
      {function() {
        return <PaymentApp/>;
      }}
    </Provider>
  ), document.body);
}
