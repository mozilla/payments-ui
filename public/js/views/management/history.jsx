import React, { Component } from 'react';

import { gettext, setTitle } from 'utils';


export default class History extends Component {

  componentDidMount() {
    setTitle(gettext('Receipts and history'));
  }

  render() {
    return (
      <div>
        <h1>{gettext('Receipts and history')}</h1>
      </div>
    );
  }
}
