import React, { Component, PropTypes } from 'react';
import { gettext } from 'utils';


export default class ErrorMessage extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  render() {
    console.log('rendering app error:', this.props.error);
    return (
      <div className="app-error">
        <p className="msg">
          {gettext('Internal error. Please try again later.')}
        </p>
      </div>
    );
  }
}
