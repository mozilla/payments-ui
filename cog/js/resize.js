/* global $ */
/* global window */
(function(){

  var $resizable = $('.resizable');

  if (!$resizable.length) {
    return;
  }

  var storageKey = 'cog-vp';
  var $panel = $resizable.closest('.panel');
  var $size = $panel.find('.size');
  var buttonSel = 'button';
  var $resizeButtonsCont = $('.resize-buttons');
  var $resizeButtons = $resizeButtonsCont.find(buttonSel);
  var $fullscreen = $panel.find('.full-screen');
  var resizePadding = 10;

  var buttonMap = {};

  $resizeButtonsCont.find(buttonSel).each(function() {
    var $elm = $(this);
    var vpHeight = $elm.data('vpHeight');
    var vpWidth = $elm.data('vpWidth');
    var key = vpWidth + ':' + vpHeight;
    buttonMap[key] = $elm.attr('id');
  });

  function getDimensionKey() {
    var w = $resizable.width();
    var h = $resizable.height();
    return w + ':' + h;
  }

  function handleActive() {
    var key = getDimensionKey();
    var buttonId = buttonMap[key];
    $resizeButtons.removeClass('active');
    if (typeof buttonId !== 'undefined') {
      $('#' + buttonId).addClass('active');
    }
  }

  function updateDimensions() {
    var w = $resizable.width();
    var h = $resizable.height();
    $size.text('@ ' + w + ' x ' + h);
    window.localStorage.setItem(storageKey,
      parseInt(w + resizePadding, 10) + ':' + parseInt(h + resizePadding, 10));
    handleActive();
  }

  var watch = new window.MutationObserver(function(){
    updateDimensions();
  });

  function  handleClick($elm) {
    var vpHeight = $elm.data('vpHeight') + resizePadding;
    var vpWidth = $elm.data('vpWidth') + resizePadding;
    $resizable.css({width: vpWidth, height: vpHeight});
    updateDimensions();
  }

  function launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  $fullscreen.on('click', function() {
    launchFullscreen($resizable[0]);
  });

  $resizeButtonsCont.on('click', 'button:not(.fullscreen)', function(e) {
    e.preventDefault();
    handleClick($(this));
  });

  if ($resizable.length) {
    // Currently this won't work on webkit. :(
    // See https://code.google.com/p/chromium/issues/detail?id=293948
    watch.observe($resizable[0],{attributes:true}) ;
  }

  var storedSize = window.localStorage.getItem(storageKey);
  if (storedSize) {
    var parts = storedSize.split(':');
    var storedWidth = parseInt(parts[0], 10);
    var storedHeight = parseInt(parts[1], 10);
    if (!isNaN(storedWidth) && !isNaN(storedHeight)) {
      $resizable.css({width: storedWidth, height: storedHeight});
      updateDimensions();
    } else {
      console.log('Stored values invalid. Ignoring');
      window.localStorage.removeItem(storageKey);
    }
  }
})();



