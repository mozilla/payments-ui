'use strict';

var React = require('react');
var CardIcon = require('components/card-icon');


module.exports = React.createClass({

  displayName: 'CardItem',

  propTypes: {
    id: React.PropTypes.number.isRequired,
    onChangeHandler: React.PropTypes.func.isRequired,
    resource_uri: React.PropTypes.string.isRequired,
    truncated_id: React.PropTypes.string.isRequired,
    type_name: React.PropTypes.string.isRequired,
  },

  render: function() {
    var cardType = this.props.type_name.toLowerCase();
    var cardText = '●●●● ●●●● ●●●● ' + this.props.truncated_id;
    var inputId = 'card-' + this.props.id;

    return (
      <li className={'card-item ci-' + this.props.id}>
        <CardIcon cardType={cardType} />
        <input id={inputId} type="radio"
               onChange={this.props.onChangeHandler}
               value={this.props.resource_uri} name="card" />
        <label htmlFor={inputId}
               className="text">{cardText}</label>
      </li>
    );
  },

});
