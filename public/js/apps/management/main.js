import $ from 'jquery';
import { init as appInit } from './app';

// Common ajax settings.
$.ajaxSetup({
  dataType: 'json',
});

appInit();
