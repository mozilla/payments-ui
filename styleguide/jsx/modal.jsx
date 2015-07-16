'use strict';

var React = require('react');
var Modal = require('components/modal');
var CardForm = require('components/card-form');
React.render(<Modal showModal={true} tite="New Card Details" >
               <CardForm />
             </Modal>, document.getElementById('modal'));
