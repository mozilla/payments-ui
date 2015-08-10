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
    selectedCardResource: PropTypes.string,
    showDefaultOption: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    showDefaultOption: true,
  }

  constructor(props) {
    super(props);
    var cardData;
    // Get the data for a the default selected card.
    if (props.selectedCardResource) {
      cardData = this.getSelectedCard(props.selectedCardResource);
    }

    // If there's default selected option and the defaultOption is off.
    // we set the "fakeSelect" to the first option.
    if (!cardData && !props.defaultOption) {
      cardData = props.cards[0];
    }

    var initialState = {
      selectedText: defaultSelectText,
      selectedCardType: null,
      isFocused: false,
    };

    if (cardData) {
      initialState.selectedText = '●●●● ●●●● ●●●● ' + cardData.truncated_id;
      initialState.selectedCardType = cardData.type_name.toLowerCase();
    }

    this.state = initialState;
  }

  getSelectedCard(selectedCardResource) {
    var selectedCard = this.props.cards.filter(function(item) {
      return (item.resource_uri === selectedCardResource);
    });
    if (selectedCard.length) {
      return selectedCard[0];
    } else {
      return {};
    }
  }

  handleFocus = () => {
    this.setState({isFocused: true});
  }

  handleBlur = () => {
    this.setState({isFocused: false});
  }

  updateCardSelection (selectedCardResource) {
    var selectedCardData = this.getSelectedCard(selectedCardResource);
    var selectedCardType = selectedCardData.type_name.toLowerCase();
    var selectedText = '●●●● ●●●● ●●●● ' + selectedCardData.truncated_id;
    this.setState({
      selectedText: selectedText || defaultSelectText,
      selectedCardType: selectedCardType,
    });
  }

  handleChange = e => {
    if (this.props.onCardChange) {
      this.props.onCardChange(e);
    }
    this.updateCardSelection(e.target.value);
  }

  render() {
    var cardData = this.props.cards;
    var cardOptions = [];

    if (this.props.showDefaultOption === true) {
      cardOptions.push((
        <option
          value=""
          key="def"
          ref="def">{defaultSelectText}</option>)
      );
    }

    for (var i = 0; i < cardData.length; i += 1) {
      var card = cardData[i];
      var optionText = card.type_name.toUpperCase() +
        ' ●●●● ●●●● ●●●● ' + card.truncated_id;

      var selected = (card.resource_uri ===
        this.props.selectedCardResource) ? 'selected' : null;

      cardOptions.push(
        <option
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
