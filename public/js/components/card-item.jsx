import React, { Component, PropTypes } from 'react';
import CardIcon from 'components/card-icon';


export default class CardItem extends Component {

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    resource_uri: PropTypes.string.isRequired,
    truncated_id: PropTypes.string.isRequired,
    type_name: PropTypes.string.isRequired,
  };

  render() {
    var cardType = this.props.type_name.toLowerCase();
    var cardText = '●●●● ●●●● ●●●● ' + this.props.truncated_id;
    var inputId = 'card-' + this.props.id;

    return (
      <li className={'card-item ci-' + this.props.id}>
        <CardIcon cardType={cardType} />
        <input id={inputId} type="radio"
               onChange={this.props.onChangeHandler}
               value={this.props.resource_uri} name="card"
               checked={this.props.checked} />
        <label htmlFor={inputId}
               className="text">{cardText}</label>
      </li>
    );
  }
}
