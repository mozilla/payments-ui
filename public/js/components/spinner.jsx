import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';


export default class Spinner extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    text: gettext('Loading'),
  }

  render() {
    return (
      <div className="spinner-cont">
        <div className="spinner"></div>
        <span className="text">{this.props.text}</span>
      </div>
    );
  }
}
