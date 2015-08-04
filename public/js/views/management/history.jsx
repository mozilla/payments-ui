import React, { Component } from 'react';

import { gettext } from 'utils';


export default class History extends Component {

  render() {
    return (
      <div>
        <h1>{gettext('Receipts and history')}</h1>
      </div>
    );
  }
}
