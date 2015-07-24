import $ from 'jquery';
import tracking from 'tracking';
import { init as initApp } from './app';

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

tracking.init();
initApp();
