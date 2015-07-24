import $ from 'jquery';
import { init as initApp } from './app';

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

initApp();
