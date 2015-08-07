import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import CardIcon from 'components/card-icon';
import { gettext } from 'utils';

const defaultSelectText = gettext('Please select');


export default class CardDropDown extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        resource_uri: PropTypes.string,
        truncated_id: PropTypes.string,
        type_name: PropTypes.string,
      })
    ).isRequired,
    cssModifier: PropTypes.string,
    onCardChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedText: defaultSelectText,
      selectedCardType: null,
      isFocused: false,
    };
  }

  handleFocus = () => {
    this.setState({isFocused: true});
  }

  handleBlur = () => {
    this.setState({isFocused: false});
  }

  handleChange = e => {
    if (this.props.onCardChange) {
      this.props.onCardChange(e);
    }
    var selectedText;
    var selectedNode = e.target.options[e.target.selectedIndex];
    if (selectedNode) {

      var selectedCardType = selectedNode.getAttribute('data-type');
      if (selectedCardType) {
        selectedText = selectedNode.firstChild.nodeValue.replace(
          selectedCardType.toUpperCase(), '');
      }
    }
    this.setState({
      selectedText: selectedText || defaultSelectText,
      selectedCardType: selectedCardType,
    });
  }

  render() {
    var cardData = this.props.cards;
    var cardOptions = [];

    cardOptions.push(<option value="">{defaultSelectText}</option>);

    for (var i = 0; i < cardData.length; i += 1) {
      var { selected, ...card } = cardData[i];
      var optionText = card.type_name.toUpperCase() +
        ' ●●●● ●●●● ●●●● ' + card.truncated_id;

      cardOptions.push(
        <option
          data-type={card.type_name.toLowerCase()}
          key={card.id}
          selected={selected}
          value={card.resource_uri}
        >{optionText}</option>
      );
    }

    var contentClasses = cx('content', {
      'has-card': this.state.selectedCardType,
    });

    var proxySelectClasses = cx('proxy-select', {
      'active': this.state.isFocused,
    });

    return (
      <div className={proxySelectClasses}>
        {this.state.selectedCardType ?
         <CardIcon cardType={this.state.selectedCardType} /> :
         null}
        <span className={contentClasses} ariaHidden="true">
          <span className="vh">{this.state.selectedCardType}</span>
          {this.state.selectedText}
        </span>
        <select
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleChange}>
          {cardOptions}
        </select>
      </div>
    );
  }
}
