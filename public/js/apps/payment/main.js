import $ from 'jquery';
import tracking from 'tracking';
import { init as appInit } from './app';

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

tracking.init();
appInit();
