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

  function getDimensionKey() {
    var w = $resizable.width();
    var h = $resizable.height();
    return w + ':' + h;
  }

  function handleActive() {
    var key = getDimensionKey();
    $resizeButtons.removeClass('active');
    $('button[data-vp="' + key + '"]').addClass('active');
  }

  function updateDimensions() {
    var w = this.width();
    var h = this.height();
    this.closest('.panel').find('.size').text('@ ' + w + ' x ' + h);
    window.localStorage.setItem(storageKey,
      parseInt(w + resizePadding, 10) + ':' + parseInt(h + resizePadding, 10));
    handleActive();
  }

  function handleClick($elm) {
    var vpData = $elm.data('vp').split(':');
    var vpWidth = parseInt(vpData[0], 10) + resizePadding;
    var vpHeight = parseInt(vpData[1], 10) + resizePadding;
    // var $resizable = $elm.closest('.panel').find('.resizable');
    $resizable.css({width: vpWidth, height: vpHeight});
    updateDimensions.apply($resizable);
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
    $resizable.each(function() {
      var watch = new window.MutationObserver(updateDimensions.bind($(this)));
      watch.observe($(this)[0], {attributes:true}) ;
    });
  }

  var storedSize = window.localStorage.getItem(storageKey);
  if (storedSize) {
    var parts = storedSize.split(':');
    var storedWidth = parseInt(parts[0], 10);
    var storedHeight = parseInt(parts[1], 10);
    if (!isNaN(storedWidth) && !isNaN(storedHeight)) {
      $resizable.each(function() {
        var $elm = $(this);
        $elm.css({width: storedWidth, height: storedHeight});
        updateDimensions.apply($elm);
      });
    } else {
      console.log('Stored values invalid. Ignoring');
      window.localStorage.removeItem(storageKey);
    }
  }
})();



