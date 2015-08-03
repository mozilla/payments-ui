import React, { Component, PropTypes } from 'react';
import CardItem from 'components/card-item';

import cx from 'classnames';


export default class CardList extends Component {

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

  render() {
    var cardData = this.props.cards;
    var cardList = [];
    for (var i = 0; i < cardData.length; i += 1) {
      var { checked, ...card } = cardData[i];
      cardList.push(<CardItem {...card} key={'ci-' + i}
                     onChangeHandler={this.props.onCardChange}
                     checked={checked} />);
    }

    var classes = cx('card-list', this.props.cssModifier);

    return (
      <ul className={classes}>
        {cardList}
      </ul>
    );
  }
}
