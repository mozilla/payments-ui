import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';


export default class ErrorMessage extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
  }

  render() {
    console.error('app error occurred:', this.props.error.debugMessage);
    var userMessage = (this.props.error.userMessage ||
                       gettext('Internal error. Please try again later.'));
    return (
      <div className="app-error">
        <p className="msg">
          {userMessage}
        </p>
      </div>
    );
  }
}
