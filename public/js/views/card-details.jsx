import $ from 'jquery';
import React, { Component, PropTypes } from 'react';

import CardForm from 'components/card-form';
import ProductDetail from 'components/product-detail';
import Spinner from 'components/spinner';

import { default as tracking } from 'tracking';


export default class CardDetailsView extends Component {

  static propTypes = {
    productId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      braintree_token: false,
    };
  }

  componentDidMount() {
    console.log('Requesting braintree token');
    // TODO: move this to a purchase action.

    this.mounted = true;

    tracking.setPage('/card-details');

    $.ajax({
      method: 'post',
      url: '/api/braintree/token/generate/',
      context: this,
    }).then(function(data) {
      if (this.mounted) {
        this.setState({'braintree_token': data.token}); // eslint-disable-line
      }
    }).fail(function() {
      // TODO: some error state.
      console.log('failed to get braintree token');
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    if (this.state.braintree_token) {
      return (
        <div className="card-details">
          <ProductDetail productId={this.props.productId} />
          <CardForm
            data-token={this.state.braintree_token}
            id="braintree-form"
            method="post"
            productId={this.props.productId}
          />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
