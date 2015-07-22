'use strict';

var React = require('react');
var CardItem = require('components/card-item');

module.exports = React.createClass({
  displayName: 'CardList',

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
