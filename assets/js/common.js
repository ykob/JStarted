// =========================================================
//
//  common.js
//  全ページ共通で利用するjavascriptを記載
//
// =========================================================

(function(){
// クロージャ開始

var $win = $(window),
    winWidth = $win.width(),
    winHeight = $win.height(),
    $body = $('body'),
    bodyTop = 0,
    userAgent = navigator.userAgent,
    os = '';

// ===============================================
//
//  UserAgent判定
// -----------------------------------------------
if (userAgent.indexOf('iPhone') > 0 || userAgent.indexOf('iPod') > 0) {
  os = 'ios';
} else if (userAgent.indexOf('Android') > 0) {
  os = 'android';
}
// ===============================================
//
//  Windowの縦横幅取得
// -----------------------------------------------
var calculateWinSize = function(){
  winWidth = $win.width();
  winHeight = $win.height();
};
// ===============================================
//
//  bodyのScrollTop値取得
// -----------------------------------------------
var calculateBodyTop = function(){
  bodyTop = $body.scrollTop();
};
// ===============================================
//
//  タイプ判別
// -----------------------------------------------
var objTypeGet = function(type, obj){
  var clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
};
//==================================================
//
//  マウスオン
//==================================================

//  透過
//----------------------------------------
$.fn.hoverFade = function(option){
  $(this).each(function(){
    var $elm = $(this),
        opt = $.extend({
          speed : 100,
          opc : 0.6,
          eas : 'linear'
        }, option);

    $elm.on({
      'mouseenter.hover_fade': function() {
        if (os == 'ios' || os == 'android') return;
        $elm.stop().animate({
          opacity: opt.opc
        }, opt.speed, opt.eas);
      },
      'mouseleave.hover_fade': function() {
        if (os == 'ios' || os == 'android') return;
        $elm.stop().animate({
          opacity: 1
        }, opt.speed, opt.eas);
      }
    })
  });
};
//  画像パス変更
//----------------------------------------
$.fn.hoverImage = function(option){
  $(this).each(function(){
    var $elm = $(this);

    $elm.on({
      'mouseenter.hoverImage': function() {
        if (os == 'ios' || os == 'android') return;
        $elm.attr('src', $elm.attr('src').replace(/^(.+)(\..+)$/,'$1_ov$2'));
      },
      'mouseleave.hoverImage': function() {
        if (os == 'ios' || os == 'android') return;
        $elm.attr('src', $elm.attr('src').replace(/^(.+)_ov(\..+)$/, '$1$2'));
      }
    })
  });
};
//==================================================
//
//  スムーススクロール
//==================================================
$.fn.smoothScroll = function(option){
  $(this).each(function(){
    var $btn = $(this),
        opt = $.extend({
          speed : 500,
          easing : 'swing'
        }, option),
        scrollNow = false;

    $btn.on({
      'click.smoothScroll': function(event){
        event.preventDefault;

        if (scrollNow === false) {
          var hash = $(this.hash),
              hashOffset = $(hash).offset().top;

          scrollNow = true;
          $('html, body').stop().animate({
            scrollTop: hashOffset
          }, opt.speed, opt.easing, function(){
            scrollNow = false;
          });
        }
      }
    });
  });
};
// ===============================================
//
//  ポップアップ
// -----------------------------------------------
$.fn.popup_win = function(option){
  $(this).each(function(i){
    var $elm = $(this),
        opt = $.extend({
          href : $elm.attr('href'),
          title : $elm.attr('title'),
          width : 600,
          height : 480,
          status : 'no',
          scrollbars : 'no',
          directories : 'no',
          menubar : 'no',
          resizable : 'no',
          toolbar : 'no'
        }, option),
        features = '';

    if (!opt.href) return;

    features += 'width=' + opt.width + ',';
    features += 'height=' + opt.height + ',';
    features += 'status=' + opt.status + ',';
    features += 'scrollbars=' + opt.scrollbars + ',';
    features += 'directories=' + opt.directories + ',';
    features += 'menubar=' + opt.menubar + ',';
    features += 'resizable=' + opt.resizable + ',';
    features += 'toolbar=' + opt.toolbar;

    $elm.on('click.popup', function(event) {
      if (winWidth <= 480) return;
      event.preventDefault;
      window.open(opt.href, opt.title, features);
    });
  });
};
//==================================================
//
//  フローティング・ウインドウ
//==================================================
$.fn.floatingWin = function(option){
  $(this).each(function(){
    var $btn = $(this),
        boxHtml = '',
        file = $(this).attr('href'),
        noScrollClass = 'no_scroll',
        topWhenWinOpen = 0,
        opt = $.extend({
          winWidth : 720,
          winHeight : 405,
          speed : 250
        }, option);

    // ウインドウのベースになるhtmlを設定
    boxHtml += '<div id="FloatingWindow">';
    boxHtml += '<div id="FloatingWindowInner">';
    boxHtml += '<div id="FloatingBody">';
    boxHtml += '<div id="FloatingBodyInner">';
    boxHtml += '<div id="FloatingContents"></div>';
    boxHtml += '<div id="FloatingClose"><img src="img/common/close.png" alt="CLOSE"></div>';
    boxHtml += '</div>';
    boxHtml += '</div>';
    boxHtml += '</div>';
    boxHtml += '<div id="FloatingBack"></div>';
    boxHtml += '</div>';

    // ファイルのタイプを確認
    var checkFiletypeYoutube = function(value){
      if (value.indexOf('https://www.youtube.com/') > -1) {
        return true;
      } else {
        return false;
      }
    };

    var checkFileTypeImg = function(value){
      var valueSplit = value.split('.'),
          ext = valueSplit[valueSplit.length - 1];

      switch (ext.toLowerCase()) {
        case 'jpeg' :
        case 'jpg' :
        case 'bmp' :
        case 'png' :
        case 'gif' : return true;
        return false;
      }
    };

    // ファイルタイプに合わせてコンテンツを生成
    var contentsBuild = function(){
      if (checkFiletypeYoutube(file) === true) {
        var contents = '';

        contents += '<iframe src="//www.youtube.com/embed/';
        contents += file.replace('https://www.youtube.com/watch?v=','');
        contents += '?autoplay=1';
        contents += '&rel=0';
        contents += '" width="';
        contents += opt.winWidth;
        contents += '" height="'
        contents += opt.winHeight;
        contents += '" frameborder="0" allowfullscreen></iframe>';

        floatingWinOpen(contents);
      } else if (checkFileTypeImg(file) === true) {
        var img = new Image(),
            contents = '';

        img.onload = function(){
          opt.winWidth = img.width;
          opt.winHeight = img.height;
          contents = '<img src=' + file + ' width="' + opt.winWidth + '" height="' + opt.winHeight + '" alt="">';

          floatingWinOpen(contents);
        };
        img.src = file;
      }
    };

    // ウィンドウを開く際の動作
    var floatingWinOpen = function(contents){
      scroll_off();

      $body.append(boxHtml);

      $('#FloatingWindow').fadeIn(opt.speed, function(){
        $('#FloatingBodyInner').stop().animate({
          width : opt.winWidth,
          height : opt.winHeight,
          marginLeft : opt.winWidth / 2 * -1,
          marginTop : opt.winHeight / 2 * -1
        }, 250, function(){
          $('#FloatingContents').append(contents);
          $('#FloatingClose').fadeIn(opt.speed);
        });
      });

      $('#FloatingClose').on({
        'click.floatingWin' : function(){
          floatingWinClose();
        }
      });

      $('#FloatingBack').on({
        'click.floatingWin' : function(){
          floatingWinClose();
        }
      });
    };

    // ウィンドウを閉じる際の動作
    var floatingWinClose = function(){
      $('#FloatingWindow').fadeOut(opt.speed, function(){
        scrollOn();
        $(this).remove();
      });
    };

    // bodyのスクロールキャンセル
    var scrollOff = function(){
      topWhenWinOpen = bodyTop;
      $body.css({
        top : bodyTop * -1
      });
      $body.addClass(noScrollClass);
    };

    var scrollOn = function(){
      $body.removeClass(noScrollClass).removeAttr('style');
      $win.scrollTop(topWhenWinOpen);
    };

    // 実行
    $btn.on({
      'click.floatingWin' : function(){
        contentsBuild();
        return false;
      }
    });
  });
};
// ===============================================
//
//  プリローダー
// -----------------------------------------------
var preload = function(imgArrExtend, callback){
  var $img = $('img.load'),
      imgArr = [],
      imgArrLength = 0,
      imgObjArr = [];

  $img.each(function(index){
    imgArr[index] = $(this).attr('src');
  });

  if (objTypeGet('Array', imgArrExtend)) {
    for (i = 0; i < imgArrExtend.length; i++) {
      Array.prototype.push.apply(imgArr, imgArrExtend);
    }
  }

  imgArrLength = imgArr.length;

  $.each(imgArr, function(index){
    imgObjArr[index] = new Image();
    imgObjArr[index].onload = function(){
      imgArrLength = imgArrLength - 1;
      if (0 >= imgArrLength && objTypeGet('Function', callback)) {
        callback();
      }
    };
    imgObjArr[index].src = imgArr[index];
  });
};
// ===============================================
//
//  イベント設定・実行
// -----------------------------------------------
$win.on({
  // ウインドウリサイズ時にサイズ取得
  'resize.calculateWinSize': function(){
    calculateWinSize();
  },
  // スクロール値取得
  'scroll.calculateBodyTop': function(){
    calculateBodyTop();
  }
});

// クロージャ終了
})();