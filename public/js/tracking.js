'use strict';

/* global ga */

var settings = require('settings');


class Tracking {

  constructor(opts) {
    opts = opts || {};
    this.id = opts.trackingId;
    this.enabled = opts.enabled;
    this.logPrefix = '[GA:' + (this.enabled ? 'ON' : 'OFF') + ']';
    this.initialized = false;
    return this;
  }

  _ga() {
    if (!this.initialized) {
      throw new Error('Must call init() first');
    } else {
      ga.apply(window, Array.prototype.slice.call(arguments));
    }
  }

  init() {
    if (this.enabled === true) {
      console.log('Tracking init (Analytics is ON)');
      /*eslint-disable */
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', this.id, 'auto');
      ga('send', 'pageview');
      /*eslint-enable */
    } else {
      console.log('Tracking init. (Analytics is OFF)');
    }
    this.initialized = true;
  }


 /*
  * Param           Type    Required  Description
  * opts.category   String  Yes       Typically the object that
  *                                   was interacted with (e.g. button)
  * opts.action     String  Yes       The type of interaction (e.g. click)
  * opts.label      String  No        Useful for categorizing events i
  *                                   (e.g. nav buttons)
  * opts.value      Number  No        Values must be non-negative.
  *                                   Useful to pass counts (e.g. 4 times)
  */
  sendEvent(opts) {
    if (!opts.category) {
      throw new Error('sendEvent: opts.category is required');
    }
    if (!opts.action) {
      throw new Error('sentEvent: opts.action is required');
    }
    if (this.enabled) {
      this._ga('send', {
        'hitType': 'event',
        'eventCategory': opts.category,
        'eventAction': opts.action,
        'eventLabel': opts.label,
        'eventValue': opts.value,
      });
    }
    console.log(this.logPrefix, 'sendEvent', JSON.stringify(opts));
  }

 /*
  * Should be called when a new view is show.
  * Used in a SPA when the url is changed.
  */
  setPage(page) {
    if (!page) {
      throw new Error('setPage: page is required');
    }
    if (this.enabled) {
      this._ga('set', 'page', page);
    }
    console.log(this.logPrefix, 'setPage', page);
  }
}

module.exports = new Tracking({
  enabled: settings.tracking.enabled,
  trackingId: settings.tracking.id,
});
