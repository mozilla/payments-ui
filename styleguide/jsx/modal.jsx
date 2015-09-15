import React from 'react';
import Modal from 'components/modal';
import { CardForm } from 'components/card-form';

React.render(<Modal showModal tite="New Card Details" >
               <CardForm processing={{}}/>
             </Modal>, document.getElementById('modal'));
