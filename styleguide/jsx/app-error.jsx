'use strict';

var React = require('react');
var AppError = require('components/error');
var CardForm = require('components/card-form');
React.render(<CardForm />, document.getElementById('view'));
React.render(<AppError />, document.getElementById('error'));
