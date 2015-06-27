'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Navigation = require('react-router').Navigation;
var Connector = require('redux/react').Connector;

var CardChoice = require('components/card-choice');
var ProductDetail = require('components/product-detail');
var Spinner = require('components/spinner');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'CardListingView',

  mixins: [Navigation],

  contextTypes: {
    router: React.PropTypes.func,
  },

  selectData: function(state) {
    console.log('card-listing: selectData() firing with', state);
    return {
      user: state.user,
    }
  },

  render: function() {
    var component = this;
    return (
      <Connector select={this.selectData}>
        {function(result) {
          if (!result.user.email) {
            return <Spinner text={gettext('Loading')}/>;
          } else if (result.user.payment_methods.length) {
            console.log('user:', result.user);
            return (
              <div className="card-listing">
                <ProductDetail productId={component.props.productId} />
                <CardChoice
                  cards={result.user.payment_methods}
                  productId={component.props.productId}
                />
                <Link
                  className="card-add bottom-link"
                  to="card-form">{gettext('Add new credit card')}</Link>
              </div>
            );
          } else {
            console.log('No card data found, showing card entry');
            component.transitionTo('card-form');
            return <Spinner text={gettext('Loading')}/>;
          }
        }}
      </Connector>
    );
  },
});
