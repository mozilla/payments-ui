'use strict';

var React = require('react');
var CardItem = require('components/card-item');

module.exports = React.createClass({
  displayName: 'CardChoice',

  propTypes: {
    cards: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        resource_uri: React.PropTypes.string,
        truncated_id: React.PropTypes.string,
        type_name: React.PropTypes.string,
      }
    )).isRequired,
    onCardChange: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      card: (this.props.cards.length === 1 ?
             this.props.cards[0].resource_uri : null),
    };
  },

  render: function() {
    var cardData = this.props.cards;
    var cardList = [];

    for (var i = 0; i < cardData.length; i += 1) {
      var { checked, ...card } = cardData[i];
      cardList.push(<CardItem {...card} key={'ci-' + i}
                     onChangeHandler={this.props.onCardChange}
                     checked={checked} />);
    }

    return (
      <ul className="card-listing">
        {cardList}
      </ul>
    );
  },
});
